import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRandomMessage } from './random-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private http: HttpClient) { }
  getCategories():Observable<Object> {
    return this.http.get('https://api.chucknorris.io/jokes/categories')
  }
  getRandomMessage(): Observable<IRandomMessage> {
    return this.http.get<IRandomMessage>('https://api.chucknorris.io/jokes/random')
  }
}
