import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursedataService } from '../../services/materiadata.service';
import { DialogService } from '../../services/dialog.service';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component.js';
import { MatDialogRef } from '@angular/material/dialog/index.js';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],

})


export class CursosComponent {
  original_courses: any;
  courses: any;
  private dialogRef1: MatDialogRef<ErrorAvisoComponent> | undefined;

  selected_category = 'all';

  constructor(private courseService: CoursedataService,
              private dialogService: DialogService,
              private router: Router,) {

  }

  ngOnInit() {
    this.courseService.getAllCourses().subscribe({
      next: courses => {
      this.original_courses = courses.data
      this.courses = this.original_courses
    },
    error: error => {
      this.dialogRef1 = this.dialogService.openFailureDialog('Error al cargar los datos, intente nuevamente');
      this.dialogRef1.afterClosed().subscribe(() => {
        this.router.navigate(['/cursos']);
      });
      return;
    }})
  }
  filterByCategory(category: string) {
    this.courses = this.original_courses.filter((course: any) => course.level === category); 
  }
  
  ShowAll() {
    this.selected_category = 'all';
    this.restart();
  }
  
  restart() {
    this.courses = this.original_courses;
  }}