import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SuccessDialogComponent } from "../components/success-dialog/success-dialog.component";
import { ErrorAvisoComponent } from "../components/error-aviso/error-aviso.component";
import { EliminarDialogComponent } from "../components/eliminar-dialog/eliminar-dialog.component";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class DialogServiceMock {
    openSuccessDialog(message: string): MatDialogRef<any, any> {
      return this.createMockDialogRef();
    }
  
    openFailureDialog(message: string): MatDialogRef<any, any> {
      return this.createMockDialogRef();
    }
  
    openDeleteDialog(message: string): MatDialogRef<any, any> {
      return this.createMockDialogRef();
    }
  
    private createMockDialogRef(): MatDialogRef<any, any> {
      return {
        afterClosed: () => of({}),
      } as MatDialogRef<any, any>;
    }
  }