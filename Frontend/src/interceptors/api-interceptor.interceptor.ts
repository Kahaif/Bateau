import {HttpErrorResponse, HttpInterceptorFn, HttpStatusCode} from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {inject} from '@angular/core';
import {UserService} from '../services/user-service/user.service';
import {Router} from '@angular/router';
import {catchError, never, of, throwError} from 'rxjs';

export const baseUrlSetter: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService)

  if (userService.loggedIn()) {
    // inject the base URL for each outgoing requests
    req = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + userService.session().accessToken
      }
    })
  }

  return next(req);
};


// catch all 401 requests and redirect the user to the sign-in page
export const unauthorizedCatcher: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService)
  const routing = inject(Router)

  const handleError = (err: any) => {
    if (err instanceof HttpErrorResponse && err.status === HttpStatusCode.Unauthorized) {
      userService.logout()
      routing.navigateByUrl('/sign-in')
    }
    return throwError(err);
  }

  return next(req).pipe(
    catchError(handleError)
  )
};
