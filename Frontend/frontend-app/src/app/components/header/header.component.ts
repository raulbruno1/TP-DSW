import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentdataService } from 'src/app/services/alumnosdata.service';
import { UserdataService } from 'src/app/services/userdata.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  studentData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private studentService: StudentdataService,
    public userDataService: UserdataService 
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.studentService.observableStudentData.subscribe(student => {
          if (student && student.data) {
            this.studentData = student;
            if (this.studentData.role === 'admin') {
              this.userDataService.setAdmin(true); 
            }
          }
        });
      }
    });
    this.userDataService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.userDataService.setAdmin(false); 
    this.authService.logout();
    this.router.navigate(['/']);
  }
}