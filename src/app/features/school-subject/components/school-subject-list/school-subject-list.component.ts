import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { SchoolSubjectTableComponent } from "../school-subject-table/school-subject-table.component";
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { SchoolSubjectFormComponent } from '../school-subject-form/school-subject-form.component';
import { DbService } from '../../../../core/services/db.service';
import { Area } from '../../../interface/Area';

@Component({
  selector: 'app-school-subject-list',
  standalone: true,
  imports: [MaterialModule, SchoolSubjectTableComponent, NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './school-subject-list.component.html',
  styleUrl: './school-subject-list.component.css'
})
export class SchoolSubjectListComponent {

  dbService = inject(DbService);
  dialog = inject(MatDialog);
  dataSource:Area[] = [];

  constructor() {
    this.getAreas();
  }

  addNewSubject() {
    const dialogRef = this.dialog.open(SchoolSubjectFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAreas();
      }
    });
  }


  getAreas() {
    this.dbService.getAreas().subscribe({
      next:({ data }) => {
        this.dataSource = data.data;
      },
    })
  }
}
