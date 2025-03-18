import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {Subscription} from 'rxjs';
import {CustomSnackbar} from '../snackbar/custom-snackbar.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user-service/user.service';
import {Router, RouterLink} from '@angular/router';
import {MatError, MatFormField} from '@angular/material/form-field';
import {FormFieldComponent} from '../form/form-field.component';
import {FormTitleComponent} from '../form/form-title.component';
import {FormComponent} from '../form/form.component';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormModule} from '../form/form-module/form.module';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  imports: [
    MatFormField,
    FormModule,
    ReactiveFormsModule,
    MatInput,
    MatError,
    RouterLink,
    NgIf
  ],
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
