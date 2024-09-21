import { Component } from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';



@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [MatPaginatorModule],
})
export class PaginatorComponent {

}
