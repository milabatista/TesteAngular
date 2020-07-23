import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];
  constructor() { }

  //O serviço expõe seu cache messagese dois métodos: um para add() uma mensagem no cache e outro para clear() o cache.
  add(message:string){
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }
}
