import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message';
import {SocketService} from '../../service/socket.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {apiUrls} from '../../../api-urls';
import {User} from '../../models/user';
import {AccountService} from '../../service/account.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  readonly serverUrl: string;
  isLoaded = false;
  private stompClient;
  form: FormGroup;
  userForm: FormGroup;
  messages: Message[] = [];
  fullName: string;
  email: string;
  userId: number;

  users: User[] = [];

  constructor(private socketService: SocketService,
              private accountService: AccountService) {
    this.serverUrl = apiUrls.API_SOCKET;
  }

  ngOnInit() {
    this.getCurrentUser();
    this.findUsersById();
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
  }

  getCurrentUser() {
    const currentUser = this.accountService.getCurrentUser();
    this.fullName = currentUser.fullName;
    this.email = currentUser.email;
    this.userId = currentUser.userId;
  }

  findUsersById() {
    this.accountService.getUsersById(this.userId).subscribe(res => this.users = res);
  }

  sendMessage() {
    if (this.form.valid) {
      const message: Message = {
        message: this.form.value.message, fromName: this.fullName,
        fromEmail: this.email
      };
      console.log(message);
      this.socketService.sendMessage(message).subscribe(res => {
        console.log(res);
      });
    }
  }

  chooseChat(chooseChatId: number) {
    this.connect();
    this.socketService.getMessages(this.userId, chooseChatId).subscribe(result  =>  {console.log(result); });
    console.log(this.messages);
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

  openSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message) {
    console.log(message.body);
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
    }
  }
}
