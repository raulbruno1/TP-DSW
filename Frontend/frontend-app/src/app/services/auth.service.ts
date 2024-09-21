import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { UserdataService } from './userdata.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private alumnoData : any

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private tokenStorageService: TokenStorageService) {
    this.checkToken();
  }

  login(token: string) {
    this.tokenStorageService.saveToken(token);
    this.loggedIn.next(true);
  }

  logout() {
    this.tokenStorageService.removeToken();
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('studentData');
    this.loggedIn.next(false);
  }

  private checkToken() {
    const token = this.tokenStorageService.getToken();
    if (token) {
      this.loggedIn.next(true);
    }
  }
}