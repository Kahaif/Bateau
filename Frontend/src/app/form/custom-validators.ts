import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {map} from 'rxjs/operators';
import {PasswordErrorCodes} from '../sign-up/password-error.codes';
import {PasswordValidatorService} from '../../api/services/password-validator.service';
import {IdentityResult} from '../../api/models/identity-result';

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor(private _pwdService: PasswordValidatorService) {}

  /**
   * Enables server-side password validation for the current control.
   */
  password = (pwdControl: AbstractControl) => {
    // We don't duplicate the validation logic, so the validation is made on the server-side
    const body = {
      body: {
        password: pwdControl.value
      }
    };

    return this._pwdService.validatePassword(body)
      .pipe(map(mapPwdResultToValidationErrors)) // project from backend results to ValidationResult
  }

  /**
   * Returns a validator ensuring that two controls values are the same
   * @param targetControl target control of which the current control should have the same value as
   */
  sameAs = (targetControl: AbstractControl) => {
    return (subjectControl:  AbstractControl) => {

      if (targetControl.value === subjectControl.value) {
        return null;
      }

      return {
        inequal: true
      } as ValidationErrors
    }
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
