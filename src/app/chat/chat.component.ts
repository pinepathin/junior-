import * as SockJS from 'sockjs-client';
import * as stomp from '@stomp/stompjs';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, map, tap} from "rxjs";

import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { WebsocketService } from '../web-socket.service';
import {fromFetch} from 'rxjs/fetch';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
refresh(chatid:string){

  window.location.reload();
  window.location.href="chat/"+chatid;
}
  @ViewChild('messageContainer')
  private messageContainer!: ElementRef;

count=0;
chatid=0;
me=0;
usertofind:string="";
  messageToSend: string = '';
  receivedMessages: any[] = [];
recname:String="";
  chats: any[] = [];
  alluser:any[]=[];
  constructor(private httpclient: HttpClient,
    private activatedRoute: ActivatedRoute,private websocketService: WebsocketService){}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {

    this.websocketService.stompClient =  stomp.Stomp.over(new SockJS('http://localhost:8081/ws', {CredentialsContainer:null,Credential:null}, {  // Set this to false to avoid sending credentials
    // Optionally, you can add headers here if needed
}));

      this.loadchats(params)
    })
    this.receivedMessages = [
      { content: 'test', sender: 0 },
      { content: 'test', sender: 1 },
    ];
    
  }
  sendMessage() {
  
    this.websocketService.sendMessage(this.chatid.toString(),{content:this.messageToSend,sender:JSON.parse(localStorage.getItem("c_user")||"").id,sender2:JSON.parse(localStorage.getItem("c_user")||"").id})
  
    
    
    this.messageToSend=""
  }
  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight-10;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }









loadchats(params:any){

//USER I WANT TO SPEAK WITH
  const recid:BigInteger = params.params.user
  const user:string=window.localStorage.getItem("c_user")||"{id:0}";
//ME = MY USERID
  this.me=JSON.parse(user).id;


  fetch("http://localhost:8081/api/chats/getChats/"+JSON.parse(user).id, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.localStorage.getItem("c_token")
    },
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json(); // This returns a promise that resolves with the JSON parsed body text
    })
    .then(data => {
      /*
      {
        PARCIPANTS=[USER1,USER2]
      }

*/

      this.chats=data.map((chat:any)=>(chat.participants[0].id==this.me?chat.participants[1]:chat.participants[0]));
     
    })




    fetch("http://localhost:8081/api/auth/all/", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + window.localStorage.getItem("c_token")
      },
  })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json(); // This returns a promise that resolves with the JSON parsed body text
      })
      .then(data => {
        /*
        {
          PARCIPANTS=[USER1,USER2]
        }
  
  */ this.alluser=data;
      })
  











if(recid.toString()==="-1"){
  console.log("returneeed")
return
}

  fetch("http://localhost:8081/api/chats/getOrCreate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.localStorage.getItem("c_token")
    },
    body: JSON.stringify({ userId1: JSON.parse(user).id, userId2: recid })
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json(); // This returns a promise that resolves with the JSON parsed body text
    })
    .then(data => {
        // Handle your data here
        this.chatid=data.id;
       this.recname= data.participants[0].id==this.me?data.participants[1].name:data.participants[0].name
        this.websocketService.connect();
        this.websocketService.subscribe(this.chatid.toString(),(message:any)=>{
          this.count++;
          if(this.count%2==1){
          this.receivedMessages.push(message);
          this.scrollToBottom();
          }
        })




        fetch("http://localhost:8081/api/messages/chat/"+this.chatid, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + window.localStorage.getItem("c_token")
          }
      }).then((res)=>(res.json())).then((data )=>{
        this.receivedMessages=data;
      })
        












    }
  
  
  
 
  
  
  
  
  
  
  
  
  )
    .catch(error => {
        console.error("Fetch error:", error);
        // Handle errors here
    });
  

}







}