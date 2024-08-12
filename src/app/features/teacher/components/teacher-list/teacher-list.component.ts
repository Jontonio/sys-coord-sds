import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherTableComponent } from "../teacher-table/teacher-table.component";
import { MatDialog } from '@angular/material/dialog';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { DbService } from '../../../../core/services/db.service';
import { InstitutionTeacher } from '../../../interface/InstitutionTeacher';
import { CacheService } from '../../../../core/services/cache.service';


@Component({
  standalone: true,
  imports: [MaterialModule, NgIconComponent, TeacherTableComponent, TeacherTableComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent {

  dataSource: InstitutionTeacher[] = [];

  readonly dialog = inject(MatDialog);
  dbService = inject(DbService);
  cacheService = inject(CacheService);
  length:number = 0;

  constructor() {
    // initializate cache
    this.dataSource = this.cacheService.cachePageTeacher.teachers;
  }

  ngOnInit(): void {
    if(this.cacheService.getCodeModularUser()){
      const data = { modular_code: this.cacheService.getCodeModularUser() }
      this.getInstitutionTeachersFromIE(data);
    }
  }

  pageIndexEvent(pageIndex: number){
    if(this.cacheService.getCodeModularUser()){
      const data = { modular_code: this.cacheService.getCodeModularUser(), pageIndex}
      this.getInstitutionTeachersFromIE(data);
    }
  }

  addTeacher() {
    const dialogRef = this.dialog.open(TeacherFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.cacheService.getCodeModularUser()){
          const data = { modular_code: this.cacheService.getCodeModularUser() }
          this.getInstitutionTeachersFromIE(data);
        }
      }
    });
  }

  getInstitutionTeachersFromIE({modular_code, id_academic_calendar, pageIndex}:any){

    this.dbService.getInstitutionTeachers({modular_code, id_academic_calendar, pageIndex} as any).subscribe({
      next:({ data }) => {
        this.dataSource = data.data;
        this.length = data.total;
      },
    })
  }

}
