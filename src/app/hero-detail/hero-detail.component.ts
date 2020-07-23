import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { from } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  /*A heropropriedade deve ser uma propriedade Input , anotada com o decorador, porque o externo será vinculado 
  a ela dessa maneira.@Input() HeroesComponent*/
  @Input() hero: Hero;


  constructor() { }

  ngOnInit(): void {
  }

}
