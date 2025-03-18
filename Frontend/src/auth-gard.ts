import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from './services/user-service/user.service';
import {CustomSnackbar} from './app/snackbar/custom-snackbar.service';

export function AuthGuard() {
  const auth = inject(UserService);
  const router = inject(Router);
  const snackbar = inject(CustomSnackbar)

  if(!auth.loggedIn()) {
    snackbar.error($localize`Vous devez être connecté pour accéder à cette page.`)
    router.navigateByUrl('/sign-in')
    return false
  }
  return true
}

