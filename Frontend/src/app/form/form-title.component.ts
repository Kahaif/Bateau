import {Component} from "@angular/core";

@Component({
  selector: 'form-title',
  standalone: false,
  template: `
    <mat-card-header >
      <mat-card-title>
        <ng-content />
      </mat-card-title>
    </mat-card-header>`
})
export class FormTitleComponent {
}
