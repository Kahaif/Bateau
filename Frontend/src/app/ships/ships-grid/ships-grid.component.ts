import {Component, inject, signal, ViewChild} from '@angular/core';
import {ShipsService} from '../../../api/services/ships.service';
import {of, switchMap, tap} from 'rxjs';
import {NonNullableFormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {FormMode, ShipsDialogComponent, ShipsDialogData} from './ships-dialog/ships-dialog.component';
import {ShipDto} from '../../../api/models/ship-dto';
import {map} from 'rxjs/operators';
import {ShipMutationRequest} from '../../../api/models/ship-mutation-request';
import {MatMenuTrigger} from '@angular/material/menu';
import {ApiV1ShipsIdPut$Json$Params} from '../../../api/fn/ships/api-v-1-ships-id-put-json';


@Component({
  selector: 'app-ships-grid',
  standalone: false,
  templateUrl: './ships-grid.component.html',
  styleUrl: './ships-grid.component.css'
})
export class ShipsGridComponent  {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  private readonly _dialog = inject(MatDialog)
  private readonly _fb = inject(NonNullableFormBuilder)
  private readonly _shipService = inject(ShipsService)
  protected readonly creationForm = this._fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required]
  })

  protected loading = true
  private _allShips = signal<ShipDto[]>([])
  protected allShips = this._allShips.asReadonly()

  private dtoToRequest(res: ShipDto | null) : ShipMutationRequest | null {
    if (!res) {
      return null
    }

    return {
      name: res.name!,
      description: res.description!
    }
  }

  private openDialog(mode: FormMode, title: string, ship: ShipDto | null) {

    return this._dialog.open(ShipsDialogComponent, {
      height: "700x",
      width: "500px",
      data: {
        title: title,
        mode: mode,
        ship: ship
      } as ShipsDialogData
    })
  }


  openAddShip = () => {
    const dialogRef =
      this.openDialog(FormMode.Create, $localize`Créer un nouveau bateau`, null)
    dialogRef.afterClosed()
      .pipe(
        map(this.dtoToRequest),
        switchMap(v => {
          if (v === null) {
            return of(null)
          }
          return this._shipService.apiV1ShipsPost$Json({body: v})
        })
      )
      .subscribe(r => {
        if (r === null) {
          return;
        }

        this._allShips.update(ships => [r, ...ships]);
      })

  }

  ngOnInit() {
    this._shipService.apiV1ShipsGet$Json()
      .pipe(tap(() => this.loading = false))
      .subscribe( this._allShips.set)
  }

  consult = (ship: ShipDto) =>  {

    const dialogRef = this.openDialog(FormMode.Readonly,
      $localize`Consultation du bateau "${ship.name}"`,
      ship
      )
  }

  edit = (ship: ShipDto) => {

    const dialogRef = this.openDialog(FormMode.Edit,
      $localize`Édition du bateau "${ship.name}"`,
      ship
    )

    dialogRef.afterClosed()
      .pipe(
        map(this.dtoToRequest),
        switchMap((v: ShipMutationRequest | null) => {
            if (v === null) {
              return of(null)
            }
            const req: ApiV1ShipsIdPut$Json$Params = {
              id: ship.id!,
              body: v,
            }
            return this._shipService.apiV1ShipsIdPut$Json(req)
          })
      )
      .subscribe((res: ShipDto | null) => {
        if (res === null) {
          return;
        }
        console.log(res)


        this._allShips.update(ships => ships.map(s => s.id === res.id ? res : s));
      })


  }

  delete = (ship: ShipDto) => {
    const hasConfirmed = confirm($localize`Voulez-vous réellement supprimer le bateau suivant :
    ${ship.name} ?`)
    if (!hasConfirmed) {
      return;
    }

    this._shipService.apiV1ShipsIdDelete({
      id: ship.id!
    })
      .subscribe(() => {
        this._allShips.update(ships => ships.filter(s => s.id !== ship.id));
      })
  }
}
