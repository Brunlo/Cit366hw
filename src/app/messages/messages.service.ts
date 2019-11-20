import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[];
  messageChangeEvent = new EventEmitter<Message[]>();

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  // functions are responsible
  // getting the list of messages and a single message respectively.
  getMessage(id: string): Message {
    for (const message of this.messages) {
      // tslint:disable-next-line: curly
      if (message.id === id)
        return message;
    }
    return null;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }


}
