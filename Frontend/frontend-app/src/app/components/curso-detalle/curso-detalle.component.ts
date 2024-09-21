import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursedataService, CourseData } from '../../services/materiadata.service';
import { AuthService } from 'src/app/services/auth.service';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { InscriptionDataService } from 'src/app/services/inscripciondata.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DialogService } from 'src/app/services/dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component.js';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';



@Component({
  selector: 'app-curso-detalle',
  templateUrl: './curso-detalle.component.html',
  styleUrls: ['./curso-detalle.component.css']
})
export class CursoDetalleComponent implements OnInit {
  isLoggedIn: boolean = false;
  course_id!: string;
  student_Id!: string;
  course!: CourseData;
  student_data!: any;
  private readonly notifier: NotifierService;
  private dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;


  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private courseService: CoursedataService,
    private studentDataService: StudentdataService,
    private inscriptiondataService: InscriptionDataService,
    private router: Router,
    notifier: NotifierService,
    private dialogService: DialogService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.course_id = params['id'];
      const storedStudentData = localStorage.getItem('studentData');
      this.student_data = storedStudentData ? JSON.parse(storedStudentData) : null;
      this.fetchCourseDetails();

    });
  }

  fetchCourseDetails(): void {
    this.courseService.getCourseById(this.course_id).subscribe({
      next: course => {
        this.course = course.data;
      },
      error: error => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
          this.router.navigate(['/cursos']);
        });
      }
    });
  }
  inscribe(): void {
    this.authService.isLoggedIn.subscribe({
      next: (loggedIn) => {
        this.isLoggedIn = loggedIn;
        if (!this.isLoggedIn) {
          this.dialogRef1 = this.dialogService.openFailureDialog('Inicie sesión para continuar');
          this.router.navigate(['/login']);
          return;
        }
      }
    });
  
    this.student_Id = this.student_data.data.id;
    const inscription_date = new Date().toISOString();
  
    this.inscriptiondataService.getInscriptionByStudentId(this.student_Id).subscribe({
      next: (inscriptions) => {
        for (const inscription of inscriptions.data) {
          if (this.course_id === inscription.course) {
            this.dialogRef1 = this.dialogService.openFailureDialog('Ya se encuentra inscripto');
            return;
          }
        }
  
        this.inscriptiondataService.addInscription(this.student_Id, this.course_id, inscription_date).subscribe({
          next: response => {
            this.dialogRef = this.dialogService.openSuccessDialog('Inscripción registrada');
            console.log(response);
            this.dialogRef.afterClosed().subscribe(() => {
              this.router.navigate(['/cursos']);
            });
          },
          error: error => {
            this.dialogRef1 = this.dialogService.openFailureDialog('Error al realizar la inscripción, intente nuevamente');
          }
        });
      },
      error: error => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al realizar la inscripción, intente nuevamente');
      }
    });
  }}