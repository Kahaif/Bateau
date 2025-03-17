import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {PasswordErrorCodes} from './password-error.codes';
import {CustomValidators} from '../../api/services/custom-validators';

export interface IdentityForm {
  password: string;
  email: string;
}

@Component({
  selector: 'app-identity-form',
  standalone: false,
  templateUrl: './identity-form.component.html',
  styleUrl: './identity-form.component.css'
})
export class IdentityFormComponent {

  private _validators = inject(CustomValidators)
  private _fb = inject(FormBuilder)

  form = this._fb.group({
    email: [null, Validators.email],
    // binding is needed to use 'this' in the validators
    password: [null, Validators.required, this._validators.password.bind(this._validators)]
  });


  @Output()
  submitted = new EventEmitter<IdentityForm>()
  @Input()
  loading = false

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted.emit({
      email: this.form.value.email!,
      password: this.form.value.password!
    })
  }

  protected readonly PasswordErrorCodes = PasswordErrorCodes;
}


