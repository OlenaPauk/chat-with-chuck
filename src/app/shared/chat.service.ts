import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRandomMessage } from './random-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getRandomMessage(): Observable<IRandomMessage> {
    return this.http.get<IRandomMessage>('https://api.chucknorris.io/jokes/random')  
  }
}
