import {
  Component, contentChild, contentChildren, ContentChildren, Directive,
  ElementRef,
  EventEmitter,
  Input,
  input,
  Output,
  QueryList,
  TemplateRef, viewChildren,
  ViewChildren
} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {finalize, Observable, Subscription} from 'rxjs';
import {MatFormField} from '@angular/material/form-field';


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
export class FormComponent  {
  fields = contentChildren<TemplateRef<unknown>>("field")
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

  protected readonly MatFormField = MatFormField;
}
