import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherTableComponent } from "../teacher-table/teacher-table.component";
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';


@Component({
  standalone: true,
  imports: [MaterialModule, NgIconComponent, TeacherTableComponent, TeacherTableComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {

  readonly dialog = inject(MatDialog);

  addTeacher() {
    const dialogRef = this.dialog.open(TeacherFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
