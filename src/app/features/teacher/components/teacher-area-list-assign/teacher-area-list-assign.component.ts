import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { TeacherAreaTableAssignComponent } from "../teacher-area-table-assign/teacher-area-table-assign.component";
import { DbService } from '../../../../core/services/db.service';
import { InstitutionTeacher } from '../../../interface/InstitutionTeacher';
import { CacheService } from '../../../../core/services/cache.service';

@Component({
  selector: 'app-teacher-area-list-assign',
  standalone: true,
  imports: [MaterialModule, TeacherAreaTableAssignComponent],
  templateUrl: './teacher-area-list-assign.component.html',
  styleUrl: './teacher-area-list-assign.component.css'
})
export class TeacherAreaListAssignComponent {

  dbService = inject(DbService);
  cacheService = inject(CacheService);

  dataSource: InstitutionTeacher[] = [];

  ngOnInit(): void {
    if(this.cacheService.getCodeModularUser()){
      const data = { modular_code: this.cacheService.getCodeModularUser() }
      this.getTeacherAreasFromIE(data);
    }
  }

  getTeacherAreasFromIE({modular_code}:any){

    this.dbService.getTeacherAreasFromIE({modular_code} as any).subscribe({
      next:({ data }) => {
        console.log(data)
        this.dataSource = data.data;
      },
    })
  }
}
