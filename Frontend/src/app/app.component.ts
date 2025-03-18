import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user-service/user.service';
import {CustomSnackbar} from './snackbar/custom-snackbar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(protected _userService: UserService, private _snackbar: CustomSnackbar, private _router: Router) {
  }

  clickLogout = () => {
    this._userService.logout()
    this._router.navigate(['/sign-in'])
  }

  ngOnInit(): void {
  }
}
