import { Component } from '@angular/core';
import { ContactService } from 'src/app/services/contacto.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component.js';

@Component({
  selector: 'app-ensenia',
  templateUrl: './ensenia.component.html',
  styleUrls: ['./ensenia.component.css']
})
export class EnseniaComponent {
  messagge: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private contactService: ContactService,
     private dialogService: DialogService,
     notifier: NotifierService,
  ) {
    this.notifier = notifier;
  }


  crearMensaje() {
    this.contactService.addMessagge(this.messagge).subscribe({
      next: (response) => {
        this.messagge = {}; 
        this.dialogRef = this.dialogService.openSuccessDialog('¡Mensaje enviado, gracias!');
        this.dialogRef.afterClosed().subscribe(() => {
        });
      },
      error: (error) => {
        this.dialogRef1= this.dialogService.openFailureDialog('Error, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
        });
      }
    });
  }
}
