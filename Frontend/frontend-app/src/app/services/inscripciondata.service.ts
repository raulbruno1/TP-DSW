import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface InscriptionData {
  student_id: string;
  course_id: string;
  inscription_date: string;
}
@Injectable({
  providedIn: 'root'
})
export class InscriptionDataService {
  private apiUrl = environment.apiUrl + '/inscripcion/';

  constructor(private http: HttpClient) { }

  addInscription(student_id: string, course_id: string, inscription_date: string): Observable<any> {
    const requestBody = { student_id, course_id, inscription_date };

    return this.http.post(this.apiUrl, requestBody)
      .pipe(
        catchError(error => {
          throw error;
        })
      );
  }

  getInscriptionByStudentId(student_id: string): Observable<any> {
    const url = `${this.apiUrl}alumno/${student_id}`;
   
    return this.http.get(url).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  deleteInscriptionById(inscID:string): Observable<any>{
    const url = `${this.apiUrl}/${inscID}`;
    return this.http.delete(url).pipe(
      catchError(error => {
        throw error;
      })
    );
  }
  
}
