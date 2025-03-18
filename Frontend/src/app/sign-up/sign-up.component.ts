import {Component, inject} from '@angular/core';
import {CustomSnackbar} from '../snackbar/custom-snackbar.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordErrorCodes} from './password-error.codes';
import {subscribeOn} from 'rxjs';
import {UserService} from '../../services/user-service/user.service';
import {CustomValidators} from '../form/custom-validators';
import {Router} from '@angular/router';

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
  private _router = inject(Router)
  //@ts-expect-error
  form! = this._fb.group({
    email: [null, Validators.email],
    password: [null, Validators.required, this._validators.password],
    passwordConfirmation: [null, Validators.required]
  })

  ngOnInit() {
    this.form.get("passwordConfirmation")?.addValidators(
      this._validators.sameAs(this.form.controls.password)
    )
  }

  onSubmit = () => {
    return this._userService.signUp(
      this.form.controls.email.value!,
      this.form.controls.password.value!
    )
      .subscribe({
        next: () => {
          this.form.reset()
          this._snackbar.success($localize`Votre compte a bien été créé. Vous pouvez vous connecter.`);
          this._router.navigate(['sign-in'])
          },

        error: () =>
          this._snackbar.error($localize`Une erreur est survenue. Veuillez recommencer.`)
      })
  }

  protected readonly PasswordErrorCodes = PasswordErrorCodes;
  protected readonly subscribeOn = subscribeOn;
}
