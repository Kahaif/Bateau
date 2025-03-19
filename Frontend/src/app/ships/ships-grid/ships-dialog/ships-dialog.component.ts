import {Component, inject, Input, model, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ShipDto} from '../../../../api/models/ship-dto';
import {FormBuilder, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

export enum FormMode {
  Edit,
  Readonly,
  Create
}


export interface ShipsDialogData {
  title:string;
  mode: FormMode;
  ship: ShipDto | null;
}

@Component({
  selector: 'ships-dialog',
  templateUrl: "ships-dialog.html",
  standalone: false,
  styleUrl: "./ships-dialog.component.css"

})
export class ShipsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<ShipsDialogComponent>);
  readonly data = inject<ShipsDialogData>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder)

  form = this._fb.group({
    name: ["", Validators.required],
    description: ""
  });

  // init the dialog according to the data (readoonly and data preset)
  ngOnInit(): void {
    if (this.data.mode !== FormMode.Create) {
      const {name, description} = this.data.ship!
      this.form.controls.name.setValue(name!)
      this.form.controls.description.setValue(description!)
    }

    if (this.data.mode === FormMode.Readonly) {
      this.form.controls.name.disable()
      this.form.controls.description.disable()
    }

  }

  get isDisabled() {
    return this.data.mode === FormMode.Readonly
  }


  onNoClick(): void {
    this.form.controls.name.enable()
    this.form.controls.description.enable()
    this.dialogRef.close()
  }

  submit(): void {
    if (this.form.invalid) {
      return
    }
    this.form.controls.name.enable()
    this.form.controls.description.enable()
    this.dialogRef.close()
  }


}
