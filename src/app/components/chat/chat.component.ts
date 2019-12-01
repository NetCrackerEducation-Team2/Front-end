import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../models/message';
import {SocketService} from '../../service/socket.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {apiUrls} from '../../../api-urls';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = apiUrls.API_SOCKET;
  isLoaded = false;
  isCustomSocketOpened = false;
  private stompClient;
  private form: FormGroup;
  private userForm: FormGroup;
  messages: Message[] = [];
  constructor(private socketService: SocketService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    });
    this.initializeWebSocketConnection();
  }

  // sendMessageUsingSocket() {
  //   if (this.form.valid) {
  //     const message: Message = { message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId };
  //     this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));
  //   }
  // }

  sendMessageUsingRest() {
    if (this.form.valid) {
      const message: Message = { message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId };
      console.log(message);
      this.socketService.post(message).subscribe(res => {
        console.log(res);
      });
    }
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  // openSocket() {
  //   if (this.isLoaded) {
  //     this.isCustomSocketOpened = true;
  //     this.stompClient.subscribe('/socket-publisher/' + this.userForm.value.fromId, (message) => {
  //       this.handleResult(message);
  //     });
  //   }
  // }

  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
    }
  }
}
