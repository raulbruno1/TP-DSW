import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-error-aviso',
  templateUrl: './error-aviso.component.html',
  styleUrls: ['./error-aviso.component.css']
})
export class ErrorAvisoComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ErrorAvisoComponent>
  ) {}

  closeDialog() {
    
    this.dialogRef.close();
    this.onClose.emit();

  }
}