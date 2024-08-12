import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherListComponent } from '../../components/teacher-list/teacher-list.component';
import { Title } from '@angular/platform-browser';
import { TeacherAreaListAssignComponent } from "../../components/teacher-area-list-assign/teacher-area-list-assign.component";
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  standalone: true,
  imports: [RouterOutlet, MaterialModule, TeacherListComponent, TeacherAreaListAssignComponent],
  templateUrl: './teacher-home.component.html',
})
export default class TeacherHomeComponent {

  titleService = inject(Title);
  selectedIndex: number = 0;
  private cdRef = inject(ChangeDetectorRef);

  constructor() {
    this.titleService.setTitle('SIRAUN | Docentes');
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedIndex = event.index;
    this.cdRef.detectChanges();
  }

}
