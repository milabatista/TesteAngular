import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
/*path: uma sequência que corresponde ao URL na barra de endereços do navegador.
component: o componente que o roteador deve criar ao navegar para esta rota.*/
  { path: 'heroes', component : HeroesComponent },
  { path : 'hero-detail', component : HeroDetailComponent}
];

@NgModule({
  /*. O forRoot()método fornece os provedores de serviço e as diretivas necessárias para o roteamento e executa a navegação inicial com base no URL atual do navegador.*/
  imports: [RouterModule.forRoot(routes)],
  /*Em seguida, AppRoutingModule exporte RouterModule para que fique disponível em todo o aplicativo.*/
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
