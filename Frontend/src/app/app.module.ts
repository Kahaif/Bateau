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
import { ShipsDetailsComponent } from './ships/ships-details/ships-details.component';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {environment} from '../environments/environment';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {ApiModule} from '../api/api.module';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {FormModule} from './form/form-module/form.module';
import {RouterLink, RouterModule} from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {ShipsDialogComponent} from './ships/ships-grid/ships-dialog/ships-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {baseUrlSetter} from '../interceptors/api-interceptor.interceptor';
import {MatMenu, MatMenuContent, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    ShipsGridComponent,
    ShipsDetailsComponent,
    SignUpComponent,
    SignInComponent,
    ShipsDialogComponent,
    ShipsGridComponent
  ],
  imports: [
    RouterModule,
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
    RouterLink,
    MatCardTitle,
    MatError,
    ApiModule.forRoot({rootUrl: environment.apiUrl}),
    MatProgressSpinner,
    MatProgressSpinnerModule,
    MatChipSet,
    MatChip,
    MatFormFieldModule,
    MatInputModule,
    MatGridList,
    MatGridTile,
    MatDialogContent,
    FormsModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatMenuContent,
  ],

  providers: [
    provideAnimationsAsync(),

    provideHttpClient(withInterceptors([baseUrlSetter]))
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
