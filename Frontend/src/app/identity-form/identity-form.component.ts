import {Component, computed, inject, Input, viewChildren} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-identity-form',
  standalone: false,
  templateUrl: './identity-form.component.html',
  styleUrl: './identity-form.component.css'
})
export class IdentityFormComponent {

  private fb = inject(FormBuilder)
  form = this.fb.group({
    email: null,
    password: null
  });

  onSubmit(): void {
    alert('Thanks!');
  }

}
