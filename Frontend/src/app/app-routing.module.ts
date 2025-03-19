import {inject, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ShipsGridComponent} from './ships/ships-grid/ships-grid.component';
import {ShipsGuard, NonAuthGuard} from './auth-gard';
import {NotFoundComponent} from './not-found/not-found.component';
import {UserService} from '../services/user-service/user.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/ships"
  },
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
    canActivate: [ShipsGuard]
  },
  {
    path: '**',
    title: '404',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
