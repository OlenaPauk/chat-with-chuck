import { IMessage } from './../shared/message';
import { ChatService } from './../shared/chat.service';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators'


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css','./media.css']
})
export class ChatPageComponent implements OnInit {
  messages: IMessage[] = []
  categories: Array<string> = [];

  newMessage: string = '';
  selectedCategory: string = ''
  userName: string = ''
  localStr: any = ''
  localMessage: any = ''
  localCategory: any = ''

  typing: boolean = false;
  flagRadio: boolean = true;
  flagInput: boolean = true;



  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    if (localStorage.length) {
      this.localStr = localStorage.getItem("messages")
      this.localMessage = JSON.parse(this.localStr)
      this.messages.push(...this.localMessage)
      console.log(this.localMessage)
      this.localCategory = localStorage.getItem("category")
      this.selectedCategory = this.localCategory.replace(/['"]+/g, '')
      console.log('Category--', this.localCategory,typeof this.localCategory)
      this.flagRadio = false
    }
    if (this.messages.length) {
      this.flagInput = false
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
      delay(4000),
    )
      .subscribe(
        (data => {
          let chuckMessage = {
            id: 0,
            message: data.value
          };
          this.typing = false;
          this.messages.push(chuckMessage);
          this.localSave();
        }
        )
      )
  }
  sendMessage() {
    if (this.newMessage.trim()) {
      let userMessage: IMessage = {
        id: 1,
        message: this.newMessage
      }
      this.messages.push(userMessage)

      this.getRandomMessage()
      this.typing = true;
      this.newMessage = '';
      this.localSave();
    }

  }
  selectCategory() {
    this.flagRadio = false
    this.flagInput = false
    if (this.userName.trim()) {
      let startMessage: IMessage = {
        id: 0,
        message: `Hello ${this.userName}! Let's talk about ${this.selectedCategory} `
      }
      this.messages.push(startMessage)
      this.userName = '';
      this.localSave();

    }
  }
  back() {
    this.flagRadio = true
    this.flagInput = true
    this.typing = false;
    this.messages = []
    this.newMessage = '';
    localStorage.clear()
  }
  localSave() {
    localStorage.setItem("messages", JSON.stringify(this.messages))
    localStorage.setItem("category", JSON.stringify(this.selectedCategory))
  }

}
