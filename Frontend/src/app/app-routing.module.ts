import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ShipsGridComponent} from './ships/ships-grid/ships-grid.component';
import {AuthGuard} from '../auth-gard';


const routes: Routes = [
  {
    title: $localize`Connexion`,
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthGuard]
  },
  {
    title: $localize`Inscription`,
    path: 'sign-up',
    component: SignUpComponent,

  },
  {
    title: $localize`Vos bateaux`,
    path: 'ships',
    component: ShipsGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
