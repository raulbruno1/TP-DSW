import { Component } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/services/auth.service'; 
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog/index.js';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  user: any = {};
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  loggedIn_student: any;

  constructor(
    private userService: UserdataService,
    private authService: AuthService,
    notifier: NotifierService,
    private dialogService: DialogService,
    private router: Router,
    private studentDataService: StudentdataService ,
  ) {
    this.notifier = notifier;
  }

  userlog() {
    this.userService.login(this.user).subscribe({
      next: (response) => {
        this.authService.login(response.token);
        this.studentDataService.getStudentData(this.user.email).subscribe({
          next: (studentData) => {
            this.loggedIn_student = studentData
            this.loggedIn_student.role = response.userRole;
            this.studentDataService.updateStudentData(studentData);
          },
          error: (error) => {
            console.error('Error al obtener datos del alumno', error);
          }
        });

        this.dialogRef = this.dialogService.openSuccessDialog('Bienvenido');
        this.dialogRef.afterClosed().subscribe(() => {
          this.studentDataService.sendStudent(this.loggedIn_student);
          localStorage.setItem('studentData', JSON.stringify(this.loggedIn_student));
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Verifique sus credenciales');
        this.dialogRef1.afterClosed().subscribe(() => {
          location.reload();
        });
      }
    });
  }
}