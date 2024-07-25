import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SchoolSubjectListComponent } from "../../components/school-subject-list/school-subject-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SchoolSubjectListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}
