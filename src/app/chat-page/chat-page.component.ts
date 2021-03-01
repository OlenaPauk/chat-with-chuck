import { IMessage } from './../shared/message';
import { ChatService } from './../shared/chat.service';
import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs/operators'

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  messages: IMessage[] = []
  newMessage: string = '';
  typing: boolean = false;
  flagRadio:boolean = true;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // this.getRandomMessage()
  }
  getRandomMessage() {
    this.chatService.getRandomMessage().pipe(
      delay(5000),
    )
      .subscribe(
        (data => {
          let chuckMessage = {
            id: 0,
            message: data.value
          };
          console.log('data----', data)
          this.typing = false;
          this.messages.push(chuckMessage);
        }
        )
      )
  }
  sendMessage() {
    console.log(this.newMessage)
    if (this.newMessage.trim()) {
      let userMessage: IMessage = {
        id: 1,
        message: this.newMessage
      }
      this.messages.push(userMessage)

      this.getRandomMessage()
      this.typing = true;
      this.newMessage = '';
      console.log(this.messages)
    }

  }

}
