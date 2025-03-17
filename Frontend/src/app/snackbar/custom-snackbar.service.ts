import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {config} from 'rxjs';

// provides a layer upon MatSnackbar with some premade configurations.

@Injectable({providedIn: 'root'})
export class CustomSnackbar {

  private readonly _actions = $localize`Fermer`

  private config(panelClass: string) {
    const baseConfig = {
      duration: 3000000,
    } as MatSnackBarConfig

    return {
      ...baseConfig,

      panelClass,
    } as MatSnackBarConfig
  }

  constructor(private _snackbar: MatSnackBar) {

  }

  success(message: string) {
    return this._snackbar.open(message, this._actions, this.config("snackbar-success"))
  }

  error(message: string) {
    return this._snackbar.open(message, this._actions, this.config("snackbar-error"))
  }
}
