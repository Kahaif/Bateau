import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ShipsGridComponent} from './ships/ships-grid/ships-grid.component';
import {AuthGuard, NonAuthGuard} from '../auth-gard';


const routes: Routes = [
  { path: '', redirectTo: "/ships", pathMatch: 'full' },
  {
    title: $localize`Connexion`,
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NonAuthGuard] // hide if already logged in
  },
  {
    title: $localize`Inscription`,
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NonAuthGuard] // hide if already logged in
  },
  {
    title: $localize`Vos bateaux`,
    path: 'ships',
    component: ShipsGridComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
