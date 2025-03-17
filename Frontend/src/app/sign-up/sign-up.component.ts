import {Component, inject, Output, signal} from '@angular/core';
import {IdentityService} from '../../api/services/identity.service';
import {CustomSnackbar} from '../snackbar/custom-snackbar.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../api/services/custom-validators';
import {RegisterPost$Params} from '../../api/fn/identity/register-post';
import {RegisterRequest} from '../../api/models/register-request';
import {PasswordErrorCodes} from './password-error.codes';
import {subscribeOn} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private _snackbar = inject(CustomSnackbar)
  private _userService = inject(UserService)
  private _validators = inject(CustomValidators)
  private _fb = inject(FormBuilder)
  //@ts-expect-error
  form! = this._fb.group({
    email: [null, Validators.email],
    // binding is needed to use 'this' in the validators
    password: [null, Validators.required, this._validators.password.bind(this._validators)],
    passwordConfirmation: [null, Validators.required]
  })

  ngOnInit() {
    this.form.get("passwordConfirmation")?.addValidators(
      this._validators.sameAs(this.form.controls.password).bind(this._validators)
    )
  }

  onSubmit() {
    return this._userService.signUp(
      this.form.controls.email.value!,
      this.form.controls.password.value!
    )
      .subscribe({
        next: () =>
          this._snackbar.success($localize`Votre compte a bien été créé. Vous pouvez vous connecter.`),

        error: () =>
          this._snackbar.error($localize`Une erreur est survenue. Veuillez recommencer.`)
      })
  }

  protected readonly PasswordErrorCodes = PasswordErrorCodes;
  protected readonly subscribeOn = subscribeOn;
}
