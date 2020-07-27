import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  /*A heropropriedade deve ser uma propriedade Input , anotada com o decorador, porque o externo será vinculado 
  a ela dessa maneira.@Input() HeroesComponent*/
  @Input() hero: Hero;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
       .subscribe(hero => this.hero = hero);
    //A route.snapshot é uma imagem estática das informações da rota logo após o componente foi criado.
    //O paramMap é um dicionário de valores de parâmetros de rota extraídos da URL. A chave "id" retorna o id do herói para buscar.
    // ***** OS PARAMETROS DE ROTAS SÃO SEMPRE STRINGS ***** o operador + do JavaScript converte a string em um número que o que o id do heróis deveria ser
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }

}
