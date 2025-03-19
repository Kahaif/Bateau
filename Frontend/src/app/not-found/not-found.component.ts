import {Component} from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-nf',
  template: `<h1 i18n>Page introuvable.</h1>
  <br />
  <a routerLink="/" i18n>Revenir à la page d'acceuil.</a>
  `
})
export class NotFoundComponent {}

