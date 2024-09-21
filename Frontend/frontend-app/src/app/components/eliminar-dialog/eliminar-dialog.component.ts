import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-eliminar-dialog',
  templateUrl: './eliminar-dialog.component.html',
  styleUrls: ['./eliminar-dialog.component.css'],

})
export class EliminarDialogComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  alumnoData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EliminarDialogComponent>,private dialogService: DialogService,

  ) {}

  closeDialog() {
    this.dialogRef.close();
    this.onClose.emit();
  }

  onDeleteAlumno(result: string) {
    this.dialogRef.close(result);
  }
  
  }
  

