import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from '../form.component';
import {FormFieldComponent} from '../form-field.component';
import {FormTitleComponent} from '../form-title.component';
import {FormButtonContentComponent} from '../form-button-content.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';


@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    FormTitleComponent,
    FormButtonContentComponent,
  ],
  exports: [
    FormButtonContentComponent,
    FormComponent,
    FormFieldComponent,
    FormTitleComponent
  ],
  imports: [
    CommonModule,
    MatCardContent,
    MatCardActions,
    MatProgressSpinner,
    MatCard,
    ReactiveFormsModule,
    MatButton,
    MatCardTitle,
    MatCardHeader
  ]
})
export class FormModule { }
