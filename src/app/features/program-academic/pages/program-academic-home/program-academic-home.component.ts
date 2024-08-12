import { Component } from '@angular/core';
import { TimeLineComponent } from "../../components/time-line/time-line.component";
import { MaterialModule } from '../../../../material/custom-material.module';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { ListProgramAcademicComponent } from "../list-program-academic/list-program-academic.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../../../shared/icons/icons';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  standalone: true,
  imports: [TimeLineComponent,
            MaterialModule,
            ShowForRolesDirective,
            NgIconComponent,
            ListProgramAcademicComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './program-academic-home.component.html',
  styleUrl: './program-academic-home.component.css'
})
export default class ProgramAcademicHomeComponent {

  addAcademicProgram() {

  }

}
