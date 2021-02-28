import { IMessage } from './../shared/message';
import { ChatService } from './../shared/chat.service';
import { Component, OnInit } from '@angular/core';
import { IRandomMessage } from '../shared/random-message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  messages: IMessage[] = []
  newMessage: string = '';
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.getRandomMessage()
  }
  getRandomMessage() {
    this.chatService.getRandomMessage().pipe(
      tap((data:IRandomMessage)=>{
        let chuckMessage = {
          id : 0,
          message : data
        };
       
      })
    )
    .subscribe(
      (message: IRandomMessage) => console.log(message)
    )
  }
  sendMessage() {
    console.log(this.newMessage)
    let userMessage: IMessage = {
      id : 1,
      message : this.newMessage
    }
    this.messages.push(userMessage)
    this.newMessage = '';
    console.log(this.messages)
  }

}
