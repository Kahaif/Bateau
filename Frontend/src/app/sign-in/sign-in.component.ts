import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomSnackbar} from '../snackbar/custom-snackbar.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private _snackbar = inject(CustomSnackbar)
  private _userService = inject(UserService)
  private _fb = inject(FormBuilder)
  private _router = inject(Router)
  //@ts-expect-error
  form! = this._fb.group({
    email: [null, Validators.email],
    // binding is needed to use 'this' in the validators
    password: [null, Validators.required],
  })

  onSubmit(): Subscription {
    return this._userService.login(
      this.form.controls.email.value!,
      this.form.controls.password.value!
    ).subscribe({
      next: () => {
        this._snackbar.success($localize`Vous êtes connecté.`)
        this._router.navigate(["/ships"])
      },

      error: () =>
        this._snackbar.error($localize`Aucune information d'identification n'a pas être trouvée.`)

    })
  }
}
