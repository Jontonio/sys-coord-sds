import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { FormProgramAcademicComponent } from '../../components/form-program-academic/form-program-academic.component';
import { DbService } from '../../../../core/services/db.service';
import { CacheService } from '../../../../core/services/cache.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../../../shared/icons/icons';
import { ProgramAcademicTableComponent } from "../../components/program-academic-table/program-academic-table.component";
import { AcademicProgram } from '../../../interface/AcademicProgram';
import { DialogData } from '../../../interface/DialogData';


@Component({
  selector: 'app-list-program-academic',
  standalone: true,
  imports: [MaterialModule,
    SkeletonComponent,
    ShowEmptyMessageComponent,
    NgIconComponent, ProgramAcademicTableComponent],
    providers: [provideIcons({ ...iconsList})],
  templateUrl: './list-program-academic.component.html',
  styleUrl: './list-program-academic.component.css'
})
export class ListProgramAcademicComponent {

  dataSource: AcademicProgram[] = [];

  readonly dialog = inject(MatDialog);
  dbService = inject(DbService);
  cacheService = inject(CacheService);
  length:number = 0;
  pageIndex: number = 0;

  constructor() {
    if(this.cacheService.getCodeModularUser()){
      const data = { modular_code: this.cacheService.getCodeModularUser(), page: this.pageIndex }
      this.getAcademicsProgramsFromIE(data);
    }
  }

  addProgramAcademic() {

    const data:DialogData<AcademicProgram> = { update:false, data: null };

    const dialogRef = this.dialog.open(FormProgramAcademicComponent, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(this.cacheService.getCodeModularUser()){
          const data = { modular_code: this.cacheService.getCodeModularUser(), page: this.pageIndex}
          this.getAcademicsProgramsFromIE(data);
        }
      }
    });
  }

  pageIndexEvent(pageIndex: number){
    if(this.cacheService.getCodeModularUser()){
      this.pageIndex = pageIndex;
      const data = { modular_code: this.cacheService.getCodeModularUser(), page: pageIndex }
      this.getAcademicsProgramsFromIE(data);
    }
  }

  getAcademicsProgramsFromIE({ modular_code, page }:any) {
    this.dbService.getAcademicProgramsFromIE({modular_code, page}).subscribe({
      next:({ data }) => {
        this.dataSource = data.data;
        this.length = data.total;
      },
    })
  }

}
