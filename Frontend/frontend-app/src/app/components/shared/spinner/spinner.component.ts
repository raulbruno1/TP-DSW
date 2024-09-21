import {Component, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class ProgressSpinner implements OnInit {

  isLoading$ = this.spinnerService.isLoading$;

  constructor(private readonly spinnerService: SpinnerService){

  }
  ngOnInit(): void {
  }
}