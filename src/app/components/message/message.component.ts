import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Message} from '../../models/message';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {SocketService} from '../../service/socket.service';
import {AccountService} from '../../service/account.service';
import {FriendService} from '../../service/friend.service';
import {ChatService} from '../../service/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {apiUrls} from '../../../api-urls';

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
  isNoError = true;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private socketService: SocketService,
              private accountService: AccountService,
              private friendsService: FriendService,
              private chatService: ChatService,
              private router: Router) {
     this.serverUrl = apiUrls.API_CHAT.API_SOCKET;
  }

  ngOnInit() {
    this.connect();
    this.getCurrentUser();
    this.getFriend();
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.getMessages();
  }

  getFriend(): void {
    const id = +this.route.snapshot.paramMap.get('friendId');
    this.userFriendId = id;
    this.accountService.getUserById(id).subscribe(resp => this.user = resp);
  }

  sendMessage() {
    if (this.form.valid) {
      const message: Message = {
        content: this.form.value.message, fromUser: this.userCurrentId,
        toUser: this.user.userId, fromUserName: this.fullName
      };
      this.socketService.sendMessage(message).subscribe();
    }
  }

  getCurrentUser() {
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
    this.socketService.getMessages(this.userFriendId, this.userCurrentId).subscribe(
      (result: Message[]) => {
        for (const res of result) {
          this.messages.push(res);
      } }
      );
  }

  openSocket() {
    this.stompClient.subscribe('/socket-publisher/' + this.user.userId, (message) => {
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
