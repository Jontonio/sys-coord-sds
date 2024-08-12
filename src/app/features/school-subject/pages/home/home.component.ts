import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SchoolSubjectListComponent } from "../../components/school-subject-list/school-subject-list.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SchoolSubjectListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  titleService = inject(Title);

  constructor(){
    this.titleService.setTitle('SIRAUN | Asignaturas');
  }

}
