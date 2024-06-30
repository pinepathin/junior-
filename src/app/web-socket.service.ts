// websocket.service.ts

import { Injectable } from '@angular/core';
import * as stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: stomp.Client;

  constructor() {
    this.stompClient =  stomp.Stomp.over(new SockJS('http://localhost:8081/ws', {CredentialsContainer:null,Credential:null}, {  // Set this to false to avoid sending credentials
                     // Optionally, you can add headers here if needed
    }));

    this.stompClient.configure({
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (msg: string): void => {
        console.log(new Date(), msg);
      }
    });
  }

  connect() {
    this.stompClient.activate();
    
  }

  disconnect() {
    if (this.stompClient.connected) {
      this.stompClient.deactivate();
    }
  }
//CHAT IDD= TOPIC
  subscribe(topic: string, callback: (message: any) => void) {
    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe(`/topic/messages/${topic}`, (message) => {
        callback(JSON.parse(message.body));
      });
    };
  }
//DESTINATION =CHATID
  sendMessage(destination: string, message: any) {
    this.stompClient.publish({ destination: `/app/chat.sendMessage/${destination}`, body: JSON.stringify(message) });
  }
}