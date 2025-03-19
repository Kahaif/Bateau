import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../environments/environment.development';
import {inject} from '@angular/core';
import {UserService} from '../services/user-service/user.service';

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
