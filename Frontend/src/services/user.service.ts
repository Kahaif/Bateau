import { Injectable } from '@angular/core';
import {IdentityService} from '../api/services/identity.service';
import {LoginPost$Params} from '../api/fn/identity/login-post';
import {RegisterPost$Params} from '../api/fn/identity/register-post';

@Injectable({
  providedIn: 'root'
})
/**
 * Service handling the login state and hiding auth details to the components.
 */
export class UserService {

  constructor(private _identityService: IdentityService) { }

  signUp(mail: string, password: string) {
    const req = {
      body: {
        email: mail,
        password: password
      }
    } as RegisterPost$Params;

    return this._identityService.loginPost(req)
  }

  login(mail: string, password: string) {
    const req = {
      body: {
        email: mail,
        password: password
      }
    } as LoginPost$Params;

    return this._identityService.loginPost(req)
      .pipe()
  }
}
