import {Injectable} from '@angular/core';
import {PasswordValidatorService} from './password-validator.service';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';
import {IdentityResult} from '../models/identity-result';
import {PasswordErrorCodes} from '../../app/identity-form/password-error.codes';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(private _pwdService: PasswordValidatorService) {}

  /**
   * Enables server-side password validation for the current control.
   */
  password(pwdControl: AbstractControl) {
    // We don't duplicate the validation logic, so the validation is made on the server-side
    const body = {
      body: {
        password: pwdControl.value
      }
    };

    return this._pwdService.validatePassword(body)
      .pipe(map(mapPwdResultToValidationErrors)) // project from backend results to ValidationResult
  }
}

export interface PasswordValidationErrors {
  codes : PasswordErrorCodes[]
}

function mapPwdResultToValidationErrors(identityResult: IdentityResult) {
  if (identityResult.succeeded) {
    return null;
  }
  const errorCodes = identityResult.errors!.map(err => err.code)
  return {
    codes: errorCodes
  } as PasswordValidationErrors;
}
