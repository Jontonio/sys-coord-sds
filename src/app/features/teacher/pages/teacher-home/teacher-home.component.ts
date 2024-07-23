import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [RouterOutlet, MaterialModule, TeacherListComponent],
  templateUrl: './teacher-home.component.html',
})
export default class TeacherHomeComponent {

  titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Docentes');
  }

}
