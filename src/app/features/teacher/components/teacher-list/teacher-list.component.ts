import { Component, inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherTableComponent } from "../teacher-table/teacher-table.component";
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  standalone: true,
  imports: [MaterialModule, TeacherTableComponent, TeacherTableComponent],
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
