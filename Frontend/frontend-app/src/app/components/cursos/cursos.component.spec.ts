import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosComponent } from './cursos.component';
import { CoursedataServiceMock } from 'src/app/mocks/materiadata.service.mock';
import { CoursedataService } from 'src/app/services/materiadata.service';
import { DialogServiceMock } from 'src/app/mocks/dialog.service.mock';
import { DialogService } from 'src/app/services/dialog.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, switchMap, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ErrorAvisoComponent } from '../error-aviso/error-aviso.component';

const httpMock = {get: jest.fn()};
const dialogMock= {open: jest.fn(),
  openFailureDialog: jest.fn(),};

describe('CursosComponent', () => {
  let component: CursosComponent;
  let fixture: ComponentFixture<CursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosComponent],
      providers: [{provide: CoursedataService, useClass: CoursedataServiceMock},
                  {provide: DialogService, useClass: DialogServiceMock},
                {provide: HttpClient, useValue: httpMock},
                {provide: DialogService, useValue: dialogMock}]
    }).compileComponents();
    fixture = TestBed.createComponent(CursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle error when getAllCourses fails', () => {
    const courseService = TestBed.inject(CoursedataService);
    const dialogService = TestBed.inject(DialogService);
    const router = TestBed.inject(Router);

    jest.spyOn(courseService, 'getAllCourses').mockImplementation(() => throwError(() => new ErrorEvent('Network error')));
    const mockDialogRef = { afterClosed: () => of({}) } as MatDialogRef<ErrorAvisoComponent, any>;
    jest.spyOn(dialogService, 'openFailureDialog').mockReturnValue(mockDialogRef);
    jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
  
    component.ngOnInit();
  
    expect(courseService.getAllCourses).toHaveBeenCalled();
    expect(dialogService.openFailureDialog).toHaveBeenCalledWith('Error al cargar los datos, intente nuevamente');
    expect(router.navigate).toHaveBeenCalledWith(['/cursos']);
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "all" as the default selected category', () => {
    expect(component.selected_category).toEqual('all');
  });

  it('should filter courses by category', () => {
    const category = 'principiante';
    component.original_courses = [
      { id: '312313333',name: 'test',totalhours:45, email: 'email@prueba', desc: 'hola', icon: '/assets/cursos/motherboard.svg' , level: 'principiante' },
      { id: '312313334',name: 'test2',totalhours:45, email: 'email2@prueba', desc: 'hola', icon: '/assets/cursos/motherboard.svg' , level: 'avanzado' },
      { id: '312313335',name: 'test3',totalhours:45, email: 'email3@prueba', desc: 'hola', icon: '/assets/cursos/motherboard.svg' , level: 'principiante' }
    ];
    component.filterByCategory(category);
    expect(component.courses).toEqual(component.original_courses.filter((course: { level: string; }) => course.level === category));
  });

  it('should show all courses when ShowAll is called', () => {
    component.ShowAll();
    expect(component.courses).toEqual(component.original_courses);
  });

  it('should reset selected category and courses when restart is called', () => {
    component.restart();
    expect(component.selected_category).toEqual('all');
    expect(component.courses).toEqual(component.original_courses);
  });
});