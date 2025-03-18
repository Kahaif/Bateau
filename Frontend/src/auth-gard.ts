import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from './services/user-service/user.service';
import {CustomSnackbar} from './app/snackbar/custom-snackbar.service';

/**
 * Guard which prevent the user from going in some pages when he's logged out.
 * Redirects him to the sign in page if he's not logged in.
 */
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

/**
 * Guard which prevent the user from going in some pages.
 * Redirects him to the ships page if he's logged in.
 */
export function NonAuthGuard() {
  const auth = inject(UserService);
  const router = inject(Router);

  if(auth.loggedIn()) {
    router.navigateByUrl('/ships')
    return false
  }
  return true
}
