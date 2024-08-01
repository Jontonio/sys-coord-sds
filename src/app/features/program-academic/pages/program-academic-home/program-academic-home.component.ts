import { Component } from '@angular/core';
import { TimeLineComponent } from "../../components/time-line/time-line.component";
import { MaterialModule } from '../../../../material/custom-material.module';

@Component({
  standalone: true,
  imports: [TimeLineComponent, MaterialModule],
  templateUrl: './program-academic-home.component.html',
  styleUrl: './program-academic-home.component.css'
})
export default class ProgramAcademicHomeComponent {

}
