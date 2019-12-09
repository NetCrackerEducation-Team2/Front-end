import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class SocketHolder {
  webSocket: SockJS;
  stompClient: any;
  connectSocketUrl: string;
  subscribeUrl: string;

  constructor(connectSocketUrl: string, subscribeUrl?: string) {
    this.connectSocketUrl = connectSocketUrl;
    this.webSocket = new SockJS(connectSocketUrl);
    this.stompClient = Stomp.over(this.webSocket);
    this.subscribeUrl = subscribeUrl;
  }
}



