import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message';
import {User} from '../../models/user';
import {Chat} from '../../models/chat';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../service/socket.service';
import {AccountService} from '../../service/account.service';
import {apiUrls} from '../../../api-urls';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {FriendService} from '../../service/friend.service';
import {MatMenuTrigger} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {ChatService} from '../../service/chat.service';
import {SnackBarService} from '../../service/presentation-services/snackBar.service';

@Component({
  selector: 'app-message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.css']
})
export class MessageGroupComponent implements OnInit {
  @ViewChild(MatMenuTrigger, {static: false}) clickHoverMenuTrigger: MatMenuTrigger;
  readonly serverUrl: string;
  isLoaded = false;
  private stompClient;
  form: FormGroup;
  messages: Message[] = [];
  fullName: string;
  email: string;
  userCurrentId: number;
  chatName: string;
  users: User[] = [];
  user: User;
  isError = false;
  chat: Chat;
  count: number;
  tempChat: User[] = [];
  usersId: number[];

  constructor(private location: Location,
              private route: ActivatedRoute,
              private socketService: SocketService,
              private chatService: ChatService,
              private accountService: AccountService,
              private friendsService: FriendService,
              private snackBarService: SnackBarService) {
    this.serverUrl = apiUrls.API_CHAT.API_SOCKET;
  }
  openAfterClosingSelect() {
    this.clickHoverMenuTrigger.openMenu();
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getChat();
    this.findUsersById();
    this.connect();
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.getMessages();
    this.findUsersByIdGroupChat();
  }

  findUsersById() {
    this.friendsService.getFriendsById(this.userCurrentId).subscribe(res => this.temp(res));
  }

  findUsersByIdGroupChat() {
    this.chatService.getChatUsers(this.chatName).subscribe(res => this.showNewUsers(res));
  }
  temp(users: User[]) {
    this.tempChat = users;
  }

  showNewUsers(users: User[]) {
    for (const user of users) {
      for (const userChat of this.tempChat) {
         console.log(userChat.userId);
         if (userChat.userId === user.userId) {
          const index = this.tempChat.indexOf(userChat);
          this.tempChat.splice(index, 1);
          this.users = this.tempChat;
        }
      }
    }
  }

  deleteUser(usersId: number[]) {
    this.tempChat = this.users;
    for (const user of this.users) {
      for (const id of usersId) {
        if (user.userId === id) {
          const index = this.tempChat.indexOf(user);
          this.tempChat.splice(index, 1);
          this.users = this.tempChat;
        }
      }
    }
  }

  addFriendsToChat(usersId: number[]) {
    this.isError = false;
    if (this.chatName == null) {
      this.isError = true;
    } else {
      this.chatService.addNewUserChat(usersId, this.chatName).subscribe(
        () => {
          this.deleteUser(usersId);
          usersId = null;
          this.snackBarService.openSuccessSnackBar('Friends was added');
        }, (error: HttpErrorResponse) => {
          this.isError = true;
        }
      );
    }
  }

  checkCurrentUser(userName: string) {
    return userName === this.fullName;
  }
  checkFriend(userName: string) {
    return userName !== this.fullName;
  }

  getChat(): void {
    this.chatName = this.route.snapshot.paramMap.get('chatName');
  }

  sendMessage(): void {
    if (this.form.valid) {
      const message: Message = {
        content: this.form.value.message, fromUser: this.userCurrentId,
        toUser: null, fromUserName: this.fullName, chatName: this.chatName
      };
      this.socketService.sendMessageGroup(message).subscribe();
      this.form.reset();
    }
  }

  getCurrentUser(): void {
    const currentUser = this.accountService.getCurrentUser();
    this.fullName = currentUser.fullName;
    this.email = currentUser.email;
    this.userCurrentId = currentUser.userId;
  }

  connect() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.isLoaded = true;
      that.openSocket();
    });
  }

  getMessages() {
    this.socketService.getGroupMessages(this.chatName).subscribe(
      (result: Message[]) => {
        for (const res of result) {
          this.messages.push(res);
        }
        this.count = this.messages.length;
      }
    );
  }
  openSocket() {
    this.stompClient.subscribe('/socket-publisher/' + this.chatName, (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
      this.count = this.messages.length;
    }
  }

  goBack(): void {
    this.location.back();
  }

}
