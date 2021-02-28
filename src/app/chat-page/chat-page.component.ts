import { IMessage } from './../shared/message';
import { ChatService } from './../shared/chat.service';
import { Component, OnInit } from '@angular/core';
import { IRandomMessage } from '../shared/random-message';

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
    this.chatService.getRandomMessage()
      .subscribe(
        (data => {
          let chuckMessage = {
            id: 0,
            message: data.value
          };
          console.log('data----',data)
          this.messages.push(chuckMessage);
          console.log(this.messages)
        }
        )
      )
  }
  sendMessage() {
    console.log(this.newMessage)
    let userMessage: IMessage = {
      id: 1,
      message: this.newMessage
    }
    this.messages.push(userMessage)
    this.newMessage = '';
    console.log(this.messages)
  }

}
