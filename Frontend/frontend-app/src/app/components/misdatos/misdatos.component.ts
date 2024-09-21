import { Component, OnInit } from '@angular/core';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { AuthService } from 'src/app/services/auth.service';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InscriptionDataService, InscriptionData } from 'src/app/services/inscripciondata.service';
import { CoursedataService, CourseData } from 'src/app/services/materiadata.service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';


interface InscriptionDetails {
  courseName: string;
  totalHours: number;
  inscription_date: string;
  inscription_Id: string;
}

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.css']
})
export class MisdatosComponent implements OnInit {
  studentData: any;
  isLoggedIn: boolean = false;
  private dialogRef: MatDialogRef<EliminarDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  inscription!: any;
  details: InscriptionDetails[] = [];
  course_Id!: string;
  coursedata!: CourseData;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private studentDataService: StudentdataService,
    private authService: AuthService,
    private dialogService: DialogService,
    private inscriptionDataService: InscriptionDataService,
    private coursedataservice: CoursedataService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        this.updateStudentInfo();
      }
    });
  }

  private updateStudentInfo() {
    const storedStudentData = localStorage.getItem('studentData');
    if (storedStudentData) {
      this.studentData = JSON.parse(storedStudentData);
    }
    const student_id = this.studentData.data.id;
    
    this.inscriptionDataService.getInscriptionByStudentId(student_id).subscribe({
      next: (inscriptions) => {
        this.details = [];
        for (const inscription of inscriptions.data) {
          this.course_Id = inscription.course;
          this.coursedataservice.getCourseById(this.course_Id).subscribe({
            next: (coursedata) => {
              const inscriptionDetails: InscriptionDetails = {
                courseName: coursedata.data.name,
                totalHours: coursedata.data.totalhours,
                inscription_date: this.formatDate(inscription.inscription_date),
                inscription_Id: inscription.id
              };
              this.details.push(inscriptionDetails);
            },
            error: (error) => {
              console.error('Error al obtener datos de la materia:', error);
            }
          });
        }
      },
      error: (error) => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar sus datos, intente nuevamente');
      }
    });
  }

  private formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  deletedialog(event: any) {
    this.dialogRef = this.dialogService.openDeleteDialog('¿Desea eliminar su cuenta?');
    this.dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'confirm') {
          this.onDeleteStudent();
        } else {
          console.log('Eliminación cancelada por el usuario');
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
      }
    });
  }

  deleteInsdialog(inscription_Id: string) {
    this.dialogRef = this.dialogService.openDeleteDialog('¿Desea eliminar su Inscripción?');
    this.dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'confirm') {
          this.inscriptionDataService.deleteInscriptionById(inscription_Id).subscribe({
            next: (response) => {
              this.updateStudentInfo();
            },
            error: (error) => {
              console.error('Error al eliminar la inscripción:', error);
            }
          });
        } else {
          console.log('Eliminación cancelada por el usuario');
        }
      },
      error: (error) => {
        console.error('Error al cerrar el diálogo:', error);
      }
    });
  }


  onDeleteStudent() {
    const storedStudentData = localStorage.getItem('studentData');
    if (storedStudentData) {
      this.studentData = JSON.parse(storedStudentData);
      const student_Id = this.studentData.data.id;
      this.studentDataService.deleteStudent(student_Id).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.authService.logout();
        },
        error: (error) => {
          this.dialogRef1 = this.dialogService.openFailureDialog('Error al eliminar, intente nuevamente');
        }
    });
    }
  }

  editInfo() {
    this.router.navigate(['/misdatos/editar']);
  }
}