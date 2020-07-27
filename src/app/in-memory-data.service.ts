//este arquivo substitui o mock-heores

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
   createDb(){
     const heroes = [
      { id: 10, name: 'Batman' },
      { id: 12, name: 'Jorja Smith' },
      { id: 13, name: 'Marie Curie' },
      { id: 14, name: 'Shosana' },
      { id: 15, name: 'Blue Sky' },
      { id: 16, name: 'Tambourine Man' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Don McLean' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
     ];
     return {heroes}
   }
   //Substitui o método genId para garantir que um herói sempre tenha um ID.
   //Se o array heroes está vazio
   //o método deve retornar o número inicial (11)
   //se o array heroes não estiver vazio, o método retornará o valor mais alto:
   //hero id + 1

   genId(heroes: Hero[]): number {
     return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
   }

}
