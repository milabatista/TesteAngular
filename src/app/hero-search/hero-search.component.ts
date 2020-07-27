import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$ : Observable<Hero[]>;
  private searchTerms = new Subject <string>();

  /*A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  You can also push values into that Observable by calling its next(value) method as the search() method does.
  The event binding to the textbox's input event calls the search() method.*/

  constructor(private heroService: HeroService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      //debounceTime(300)aguarda até o fluxo de novos eventos de sequência pausar por 300 milissegundos antes de transmitir a sequência mais recente. Você nunca fará solicitações com mais frequência que 300 ms
      debounceTime (300),

      // ignore new term if same as previous term
      //distinctUntilChanged() garante que uma solicitação seja enviada apenas se o texto do filtro for alterado.
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      //switchMap()chama o serviço de pesquisa para cada termo de pesquisa que o faz passar por debounce()e distinctUntilChanged(). Cancela e descarta os observáveis ​​de pesquisa anteriores, retornando apenas o serviço de pesquisa mais recente observável.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
    
  }

  /*Lembre-se de que a classe de componente não assina o heroes$ observable . 
  Esse é o trabalho do AsyncPipe no modelo.*/

}
