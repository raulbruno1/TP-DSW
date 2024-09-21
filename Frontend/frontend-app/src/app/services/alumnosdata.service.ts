import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentdataService {
  private apiUrl = environment.apiUrl + '/alumnos';

  studentData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  studentDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  observableStudentData= this.studentDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  addStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrl, studentData);
  }

  checkEmailExists(email: string): Observable<any> {
    const url = `${this.apiUrl}/email/${email}`;
    return this.http.get(url);
  }

  sendStudent(studentData: any){
    this.studentDataSubject.next(studentData)
  }

  updateStudentData(data: any): void {
    this.studentData.next(data);
  }

  deleteStudent(student_id: string): Observable<any> {
    const url = `${this.apiUrl}/${student_id}`; 
    return this.http.delete(url);
  }

  updateStudent(student_id: string,student: any):Observable<any>{
    
    const url=`${this.apiUrl}/${student_id}`; 
    return this.http.patch(url, student);
  }

  
  getStudentData(email: string): Observable<any> {
    const url=`${this.apiUrl}/email/${email}`;
      return this.http.get(url);
  }
  getStudentDataId(Alumnoid: string): Observable<any> {
    const url=`${this.apiUrl}/${Alumnoid}`;
    return this.http.get(url);
  }
}