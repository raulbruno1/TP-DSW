import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { environment } from '../../environments/environment';


class HttpClientMock {
  get() {
    return of([]);
  }
}

export interface CourseDataMock {
    name: string;
    totalhours: number;
    email: string;
    level: string;
    desc: string;
    icon: string;
  }
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class CoursedataServiceMock {
    private http: HttpClient = new HttpClientMock() as any;
    private apiUrl = environment.apiUrl + '/materia';
  
  
    constructor() { }
  
  
    getCourse(courseData: CourseDataMock): Observable<any> {
  
      const params = new HttpParams()
        .set('name', courseData.name)
        .set('totalhours', courseData.totalhours.toString())
        .set('email', courseData.email)
        .set('level', courseData.level.toString())
        .set('description', courseData.desc)
        .set('icon', courseData.icon);
  
      return this.http.get(this.apiUrl, { params });
    }
  
  
    getCourseById(id: string): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get(url).pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error));
        })
      );
    }
  
  
    getAllCourses(): Observable<any> {
      return this.http.get(this.apiUrl).pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error));
        })
  
      )
    }
  
    addCourse(courseData: any): Observable<any> {
      return this.http.post(this.apiUrl, courseData).pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error));
        })
      );
    }
  
    updateCourse(id: string, courseData: any): Observable<any> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put(url, courseData).pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error));
        })
      );
    }
    deleteCourseById(id:string):Observable<any>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete(url).pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error));
        })
      );
    }
  
  }