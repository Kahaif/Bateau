import { Component } from '@angular/core';
import {UserService} from '../services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private _userService: UserService) {
  }

  get loggedIn() {
    return this._userService.loggedIn()
  }
}
