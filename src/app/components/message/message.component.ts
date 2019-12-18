import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Message} from '../../models/message';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute} from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {apiUrls} from '../../../api-urls';
import {Chat} from '../../models/chat';
import {ChatService} from '../../service/chat.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  readonly serverUrl: string;
  isLoaded = false;
  private stompClient;
  form: FormGroup;
  messages: Message[] = [];
  fullName: string;
  email: string;
  userCurrentId: number;
  userFriendId: number;
  users: User[] = [];
  user: User;
  isError = false;
  chat: Chat;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private chatService: ChatService,
              private accountService: AccountService) {
    this.serverUrl = apiUrls.API_CHAT.API_SOCKET;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getFriend();
    this.getChat();

    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.getMessages();
  }

  checkCurrentUser(userName: string) {
    return userName === this.fullName;
  }
  checkFriend(userName: string) {
    return userName !== this.fullName;
  }

  getFriend(): void {
    const friendId = +this.route.snapshot.paramMap.get('friendId');
    this.userFriendId = friendId;
    this.accountService.getUserById(friendId).subscribe(resp => this.user = resp);
  }

  getChat(): void {
    this.chatService.getChatId(this.userFriendId, this.userCurrentId).subscribe(resp => { this.connect(resp.chatId); } );
  }

  sendMessage(): void {
    if (this.form.valid) {
      const message: Message = {
        content: this.form.value.message, fromUser: this.userCurrentId,
        toUser: this.user.userId, fromUserName: this.fullName, chatName: null
      };
      this.chatService.sendMessage(message).subscribe();
      this.form.reset();
    }
  }

  getCurrentUser(): void {
    const currentUser = this.accountService.getCurrentUser();
    this.fullName = currentUser.fullName;
    this.email = currentUser.email;
    this.userCurrentId = currentUser.userId;
  }

  connect(chatId: number) {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.isLoaded = true;
      that.openSocket(chatId);
    });
  }

  getMessages() {
    this.chatService.getMessages(this.userFriendId, this.userCurrentId).subscribe(
      (result: Message[]) => {
        for (const res of result) {
          this.messages.push(res);
        }
      }
    );
  }
  openSocket(chatId: number) {
    this.stompClient.subscribe('/socket-publisher/' + chatId, (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      this.messages.push(messageResult);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
