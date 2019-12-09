import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message';
import {User} from '../../models/user';
import {Chat} from '../../models/chat';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../../service/socket.service';
import {AccountService} from '../../service/account.service';
import {apiUrls} from '../../../api-urls';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-message-group',
  templateUrl: './message-group.component.html',
  styleUrls: ['./message-group.component.css']
})
export class MessageGroupComponent implements OnInit {

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

  constructor(private location: Location,
              private route: ActivatedRoute,
              private socketService: SocketService,
              private accountService: AccountService) {
    this.serverUrl = apiUrls.API_CHAT.API_SOCKET;
  }

  ngOnInit() {
    this.connect();
    this.getCurrentUser();
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
    }
  }

  goBack(): void {
    this.location.back();
  }

}
