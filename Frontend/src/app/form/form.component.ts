import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {finalize, Observable, Subscription} from 'rxjs';


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
  onSubmit!: () =>  Subscription;

  _onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.loading = true
    this.onSubmit().add(() => this.loading = false)
  }
}
