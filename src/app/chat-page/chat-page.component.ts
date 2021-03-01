import { IMessage } from './../shared/message';
import { ChatService } from './../shared/chat.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators'


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  messages: IMessage[] = []
  newMessage: string = '';
  typing: boolean = false;
  flagRadio: boolean = true;
  categories: Array<string> = [];
  selectedCategory: string = ''
  flagInput: boolean = true
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    if (this.selectedCategory) {
      console.log(this.selectedCategory)
      this.getRandomMessage()
      console.log('WORKKKKK')
    }

    this.getCategories()
  }
  getCategories() {
    this.chatService.getCategories()
      .subscribe(
        (data: any) => {
          this.categories.push(...data)
        }
      )
  }
  getRandomMessage() {
    this.chatService.getRandomMessage(this.selectedCategory).pipe(
      delay(1000),
    )
      .subscribe(
        (data => {
          let chuckMessage = {
            id: 0,
            message: data.value
          };
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
    }

  }
  selectCategory() {
    this.flagRadio = false
    this.flagInput = false
    console.log('click',this.selectedCategory)
  }

}
