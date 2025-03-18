import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ShipsGridComponent } from './ships/ships-grid/ships-grid.component';
import { ShipsGridItemComponent } from './ships/ships-grid-item/ships-grid-item.component';
import { ShipsDetailsComponent } from './ships/ships-details/ships-details.component';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {environment} from '../environments/environment';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ApiModule} from '../api/api.module';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {FormComponent} from './form/form.component';
import {FormFieldComponent} from './form/form-field.component';
import {FormTitleComponent} from './form/form-title.component';
import {FormButtonContentComponent} from './form/form-button-content.component';
import {FormModule} from './form/form-module/form.module';



@NgModule({
  declarations: [
    AppComponent,
    ShipsGridComponent,
    ShipsGridItemComponent,
    ShipsDetailsComponent,

  ],
  imports: [
    SignInComponent,
    SignUpComponent,
    FormModule,
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormField,
    MatCardContent,
    MatCardHeader,
    MatCard,
    ReactiveFormsModule,
    MatInput,
    MatCardActions,
    MatCardTitle,

    MatError,
    ApiModule.forRoot({rootUrl: environment.apiUrl}),
    MatProgressSpinner,
    MatProgressSpinnerModule,
    MatChipSet,
    MatChip,
    MatFormFieldModule,
    MatInputModule,
  ],

  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi())
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
