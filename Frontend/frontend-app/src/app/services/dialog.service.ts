import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../components/success-dialog/success-dialog.component';
import { EliminarDialogComponent } from '../components/eliminar-dialog/eliminar-dialog.component';
import { ErrorAvisoComponent } from '../components/error-aviso/error-aviso.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  openSuccessDialog(message: string): MatDialogRef<SuccessDialogComponent> {
    return this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      height: '150px',
      data: { message }
    });
  }
  openFailureDialog(message: string): MatDialogRef<ErrorAvisoComponent> {
      console.log(message)
        return this.dialog.open(ErrorAvisoComponent, {
      width: '350px',
      height: '130px',
      data: { message }
    });
     }


  openDeleteDialog(message: string): MatDialogRef<EliminarDialogComponent> {
    return this.dialog.open(EliminarDialogComponent, {
      width: '600px',
      height: '150px',
      data: { message }
    });
  }
}