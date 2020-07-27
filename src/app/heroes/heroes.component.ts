import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';  
import { HeroService } from  '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  //propriedade 'heroes' puxa o valor da constante HEROES em mock-heroes
  //heroes = HEROES ;
  heroes : Hero [];
  @Input() hero: Hero;
  //selectedHero: Hero;

  //passa um método para o construtor da classe HeroService
  //O parâmetro define simultaneamente uma propriedade heroService privada e a identifica como um HeroServicelocal de injeção.
  constructor(private heroService: HeroService) {

  //é possível chamar 'this.getHeroes();' aqui, mas não é a melhor maneira
  //pois é aqui que ocorrerão inicializações mais simples
  //ele não deve fazer nenuma ação
  }


  ngOnInit() {
    this.getHeroes();
  }


  //O objeto "hero" é do tipo "Hero"(uma interface localizada em src/app chamata 'hero.ts')
  /*hero : Hero = {
    id : 5 ,
    name: 'Major Tom'
    };*/

  //Atribui o herói clicado do model aos componentes selectHero
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add('lalala');
  } */

  //Cria um método para recuperar os heróis do service.
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }   
  
  /*Em resposta a um evento click, chame o manipulador de cliques do componente add()e limpe o campo de entrada para que fique pronto para outro nome*/
  /*Quando o nome fornecido não está em branco, o manipulador cria um Heroobjeto semelhante a partir do nome (só falta o id) e o passa para o addHero()método de serviços .
  Quando addHero()salva com sucesso, o subscribe()retorno de chamada recebe o novo herói e o envia à heroeslista para exibição.*/
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
