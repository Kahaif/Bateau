import {Component, inject} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PasswordValidatorService} from '../../api/services/password-validator.service';
import {IdentityResult} from '../../api/models/identity-result';
import {PasswordErrorCodes} from './password-error.codes';


@Component({
  selector: 'app-identity-form',
  standalone: false,
  templateUrl: './identity-form.component.html',
  styleUrl: './identity-form.component.css'
})
export class IdentityFormComponent {

  constructor(private validator: PasswordValidatorService) {
  }

  private fb = inject(FormBuilder)
  form = this.fb.group({
    email: null,
    password: null
  });

  passwordErrors: IdentityResult | undefined;

  triggerPasswordValidation() {
    const body = {
      body: {
        password: this.form.value.password
      }
    };
    this.validator.validatePassword(body)
      .subscribe(result => this.passwordErrors = result)
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  protected readonly PasswordErrorCodes = PasswordErrorCodes;
}
