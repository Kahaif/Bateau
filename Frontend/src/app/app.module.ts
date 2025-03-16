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
import {MatFormField} from '@angular/material/form-field';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {IdentityFormComponent} from './identity-form/identity-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ShipsGridComponent,
    ShipsGridItemComponent,
    ShipsDetailsComponent,
    IdentityFormComponent,
  ],
  imports: [
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
  ],

  providers: [
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
