import { Component, OnInit } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component'
import { from } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HeroService } from '../hero.service'
import { Hero } from '../hero'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
     .subscribe(heroes => this.heroes = heroes/*= heroes.slice(1,5)*/)
  }

}
