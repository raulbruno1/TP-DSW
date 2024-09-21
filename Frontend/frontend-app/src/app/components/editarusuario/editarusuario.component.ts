import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { UserdataService } from 'src/app/services/userdata.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importa los módulos necesarios

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditUserComponent implements OnInit {
  alumnoForm!: FormGroup;

  studentData: any;
  student: any = {};
  studentId!: string;
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  constructor(
    private studentService: StudentdataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService,
    private userdata: UserdataService,
    private fb: FormBuilder
  ) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    const storedStudentData = localStorage.getItem('studentData');
    if (storedStudentData) {
      this.studentData = JSON.parse(storedStudentData);
      this.student.name = this.studentData.data.name;
      this.student.lastname = this.studentData.data.lastname;
      this.student.age = this.studentData.data.age;
      this.student.email = this.studentData.data.email;
      this.student.password = this.studentData.data.password;
      this.studentId = this.studentData.data.id;
    }

    this.alumnoForm = this.fb.group({
      name: [this.student.name, Validators.required],
      lastname: [this.student.lastname, Validators.required],
      age: [this.student.age, Validators.required],
      password: [this.student.password, [Validators.required, Validators.minLength(4)]]
    });
  }

  editStudent() {
    if (this.alumnoForm.valid) {
      this.studentService.updateStudent(this.studentId, this.alumnoForm.value).subscribe({
        next: (response) => {
          this.dialogRef = this.dialogService.openSuccessDialog('Perfil Editado');
          this.dialogRef.afterClosed().subscribe(() => {
            this.studentService.getStudentData(this.student.email).subscribe({
              next: (studentData) => {
                this.student = studentData.data;
                this.studentService.sendStudent(studentData);
                localStorage.setItem('studentData', JSON.stringify(studentData));
                this.router.navigate(['/misdatos']);
              },
              error: (error) => {
                console.error('Error al obtener datos del alumno', error);
              }
            });
          });
        },
        error: (error: any) => {
          this.dialogRef1 = this.dialogService.openFailureDialog('Verifique sus credenciales');
          this.dialogRef1.afterClosed().subscribe(() => {
            location.reload();
          });
        }
      });
    }
  }
}