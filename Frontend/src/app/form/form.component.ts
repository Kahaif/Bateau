import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {finalize, Observable, Subscription} from 'rxjs';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';


/**
 * Standard form layout across the app.
 * Use form-* fields for customization and usage.
 * This also extends the submission logic with an automatic loading state.
 */
@Component({
  selector: 'app-form',
  standalone: false,

  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  loading = false

  @Input({
    required: true,
  })
  form!: FormGroup;


  @Input()
  submit!: () =>  Subscription;

  _onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.loading = true
    this.submit().add(() => this.loading = false)
  }
}
