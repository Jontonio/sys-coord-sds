import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { SchoolSubjectTableComponent } from "../school-subject-table/school-subject-table.component";
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-school-subject-list',
  standalone: true,
  imports: [MaterialModule, SchoolSubjectTableComponent, NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './school-subject-list.component.html',
  styleUrl: './school-subject-list.component.css'
})
export class SchoolSubjectListComponent {

  addNewSubject() {

  }
}
