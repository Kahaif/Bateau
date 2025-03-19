import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormComponent} from '../form.component';
import {FormTitleComponent} from '../form-title.component';
import {FormButtonContentComponent} from '../form-button-content.component';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AppRoutingModule} from '../../app-routing.module';


@NgModule({
  declarations: [
    FormComponent,
    FormButtonContentComponent,
    FormTitleComponent,
  ],
  exports: [
    FormButtonContentComponent,
    FormComponent,
    FormTitleComponent
  ],
  imports: [
    CommonModule,
    MatCardContent,
    AppRoutingModule,
    MatCardActions,
    MatCardModule,
    MatProgressSpinner,
    MatCard,
    ReactiveFormsModule,
    MatButton,
    MatCardHeader,
    MatCardTitle,
  ]
})
export class FormModule { }
