import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavigationComponent } from './navigation/navigation.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SignUpComponent,
    SignInComponent,
    ShipsGridComponent,
    ShipsGridItemComponent,
    ShipsDetailsComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
