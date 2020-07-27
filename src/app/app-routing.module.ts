import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent }   from './dashboard/dashboard.component';


//Aqui eu defino as rotas
const routes: Routes = [
/*path: uma sequência que corresponde ao URL na barra de endereços do navegador.
component: o componente que o roteador deve criar ao navegar para esta rota.*/
  { path: 'heroes', component : HeroesComponent },
  { path: 'details/:id', component : HeroDetailComponent },
  { path : 'dashboard', component : DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  
/*Quando o aplicativo é iniciado, a barra de endereço do navegador aponta para a raiz do site. Isso não corresponde a nenhuma rota existente, portanto o roteador não navega em lugar nenhum. O espaço abaixo do está em branco.<router-outlet> */
];

@NgModule({
  /*. O forRoot()método fornece os provedores de serviço e as diretivas necessárias para o roteamento e executa a navegação inicial com base no URL atual do navegador.*/
  imports: [RouterModule.forRoot(routes)],
  /*Em seguida, AppRoutingModule exporte RouterModule para que fique disponível em todo o aplicativo.*/
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
