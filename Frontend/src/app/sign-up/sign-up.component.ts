import {Component, signal} from '@angular/core';
import {IdentityForm} from '../identity-form/identity-form.component';
import {IdentityService} from '../../api/services/identity.service';
import {IdentityError} from '../../api/models/identity-error';
import {finalize} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CustomSnackbar} from '../snackbar/custom-snackbar.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  loading = false
  constructor(private _service: IdentityService, private _snackbar: CustomSnackbar) {}


  createAccount(data: IdentityForm) {
    this.loading = true;
    this._service.registerPost({body: data})
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () =>
          this._snackbar.success($localize`Votre compte a bien été créé. Vous pouvez vous connecter.`),

        error: () =>
          this._snackbar.error($localize`Une erreur est survenue. Veuillez recommencer.`)
      })
  }
}
