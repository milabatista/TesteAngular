import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService} from './message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor( 
    private messageService: MessageService,
    private http: HttpClient ) { }
    
    private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
  //chama o método getHeroes da classe Hero
  /*getHeroes() : Hero[] {
    return HEROES;
  }*/
  //of(HEROES)retorna um Observable<Hero[]>que emite um único valor , a matriz de heróis simulados.
  /*getHeroes() : Observable<Hero[]>{
    //envia a mensagem depois de buscar os heróis
    this.messageService.add(`HeroService: enviou herois`);
    return of (HEROES);
  }*/

  //método acima, mas adaptado para usar o HttpClient
  //este método deve detectar erros e fazer algo apropriado
  //O handleError()método a seguir relata o erro e retorna um resultado não nocivo para que o aplicativo continue funcionando.
 /* getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }*/
  
  /*Os HeroServicemétodos irá tocar no fluxo de valores observáveis e enviar uma mensagem, através do log()método, para a área de mensagem na parte inferior da página.
  Eles farão isso com o tap()operador RxJS , que analisa os valores observáveis, faz algo com esses valores e os transmite. A tap()chamada de retorno não toca nos próprios valores.*/
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('herois buscados')),
      catchError(this.handleError<Hero[]>('getHeroes'))
    );
  }
  
 /*   getHero(id:number):Observable<Hero>{
      //envia a mensagem depois de buscar o herói
      this.messageService.add(`HeroService: enviou id=${id} de hero `);
      return of (HEROES.find(hero=> hero.id === id));
    } */

  getHero(id:number) :Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`burcar herói id=${id}`)),
      catchError(this.handleError<Hero> (`getHero id = ${id}`))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /**
 * Operação Handle Http que falhou.
 * Let the app continue.
 * @param operation - nome da operação que falhou
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // envia o erro para a infraestrutura de log remoto
      console.error(error); // log to console instead

      // melhor trabalho de transformação de erro para consumo do usuário
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  /*-- HEROES COMPONENT --*/
  updateHero(hero : Hero) : Observable<any>{
    /*O HttpClient.put()método usa três parâmetros:
    -o URL
    -os dados a serem atualizados (o herói modificado neste caso)
    -opções*/
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero id =${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  /*addHero()difere de updateHero()duas maneiras:
  -Chama em HttpClient.post()vez de put().
  -Ele espera que o servidor gere um ID para o novo herói, que ele retorna Observable<Hero>para o chamador.*/
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero : Hero | number): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),  
      catchError(this.handleError<Hero>('deleteHero'))
  );
  }
/*----*/
  
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
