import {Component, ViewChild, viewChildren, ViewChildren} from "@angular/core";

// NOTE : mat-form-field is not projected, cause it creates more issues than int solve
// cf https://github.com/angular/components/issues/9411
@Component({
  selector: 'form-field',
  standalone: false,
  template: `
    <div class="row">
      <div class="col">
        <ng-content/>
      </div>
    </div>
  `
})
export class FormFieldComponent {

}
