import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor() { }
  //chama o método getHeroes da classe Hero
  /*getHeroes() : Hero[] {
    return HEROES;
  }*/
  //of(HEROES)retorna um Observable<Hero[]>que emite um único valor , a matriz de heróis simulados.
  getHeroes() : Observable<Hero[]>{
    return of (HEROES);
  }
}
