import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CoursedataService } from 'src/app/services/materiadata.service';
import { DialogService } from 'src/app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog/index.js';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';
import { EliminarDialogComponent } from '../eliminar-dialog/eliminar-dialog.component';
import { MatPaginator, MatPaginatorModule  } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,NgFor, RouterModule],
})
export class AdminCursosComponent {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  total_courses: any
  courses: any;
  private dialogRef: MatDialogRef<EliminarDialogComponent> | undefined;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;
  displayedColumns: string[] = ['name', 'level', 'totalhours', 'actions'];

  constructor(
    private courseService: CoursedataService,
    private dialogService: DialogService,
    private router: Router,
    private coursedataservice: CoursedataService
  ) {}


  
  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
        this.total_courses = new MatTableDataSource(courses.data);
        this.total_courses.sort = this.sort
        this.total_courses.paginator = this.paginator
      },
      error: error => {
        this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
        this.dialogRef1.afterClosed().subscribe(() => {
          this.router.navigate(['/cursos']);
        });
        return;
      }
    });
  }

  deleteInsdialog(course_id: string) {
    this.dialogRef = this.dialogService.openDeleteDialog('¿Desea eliminar el curso?');
    this.dialogRef.afterClosed().subscribe({
      next: result => {
        if (result === 'confirm') {
          this.coursedataservice.deleteCourseById(course_id).subscribe({
            next: (response) => {
              window.location.reload();
            },
            error: (error) => {
              console.error('Error al eliminar el curso:', error);
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

  editCurso(id: string) {
    this.router.navigate(['/alta-curso', id]); 
  }


  newCourse() {
    this.router.navigate(['/alta-curso']);
  }
}