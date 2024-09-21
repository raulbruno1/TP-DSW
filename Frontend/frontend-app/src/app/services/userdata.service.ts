import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StudentdataService } from './alumnosdata.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  private apiUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {

    const storedStudentData = localStorage.getItem('studentData');
    if (storedStudentData) {
      const student = JSON.parse(storedStudentData);
      if (student.role === 'admin') {
        this.setAdmin(true);
      }
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error) => {
          console.error('Error during login:', error);
          throw error;
        })
      );
  }

  setAdmin(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
    localStorage.setItem('isAdmin', isAdmin.toString());
  }

  get isAdmin(): boolean {
    return this.isAdminSubject.value;
  }
}