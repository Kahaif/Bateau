import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {$localize} from '@angular/localize/init';
import {ShipsGridComponent} from './ships/ships-grid/ships-grid.component';

const routes: Routes = [
  {
    title: $localize`Connexion`,
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    title: $localize`Inscription`,
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    title: $localize`Inscription`,
    path: 'ships',
    component: ShipsGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
