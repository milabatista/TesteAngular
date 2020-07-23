import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';  
//import { HEROES } from '../mock-heroes';
import { HeroService } from  '../hero.service';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { ThrowStmt } from '@angular/compiler';
import { MessageService } from '../message.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  //propriedade 'heroes' puxa o valor da constante HEROES em mock-heroes
  //heroes = HEROES ;
  heroes : Hero [];
  selectedHero: Hero;

  //passa um método para o construtor da classe HeroService
  //O parâmetro define simultaneamente uma propriedade heroService privada e a identifica como um HeroServicelocal de injeção.
  constructor(private heroService: HeroService, private messageService:MessageService) {
    //é possível chamar 'this.getHeroes();' aqui, mas não é a melhor maneira
    //pois é aqui que ocorrerão inicializações mais simples
    //ele não deve fazer nenuma ação
  }
  ngOnInit() {
    this.getHeroes();
  }
  //O objeto "hero" é do tipo "Hero"(uma interface localizada em src/app chamata 'hero.ts')
   hero : Hero = {
    id : 5 ,
    name: 'Major Tom'
    };

   //Atribui o herói clicado do model aos componentes selectHero

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add('HerosComponent: Selected hero id=${hero.id}');
  } 

  //Cria um método para recuperar os heróis do service.
  getHeroes(): void {
    //this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
    }   
}
