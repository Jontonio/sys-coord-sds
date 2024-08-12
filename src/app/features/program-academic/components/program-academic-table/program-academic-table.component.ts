import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { FormProgramAcademicComponent } from '../form-program-academic/form-program-academic.component';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../../../../core/services/db.service';
import { CacheService } from '../../../../core/services/cache.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { MaterialModule } from '../../../../material/custom-material.module';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { AcademicProgram } from '../../../interface/AcademicProgram';
import { UnitListCardComponent } from "../../../unit/components/unit-list-card/unit-list-card.component";
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../../../shared/icons/icons';
import { PageEvent } from '@angular/material/paginator';
import { UnitFormComponent } from '../../../unit/components/unit-form/unit-form.component';
import { DialogData } from '../../../interface/DialogData';
import { Unit } from '../../../interface/Unit';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-program-academic-table',
  standalone: true,
  imports: [MaterialModule,
            SkeletonComponent,
            ShowEmptyMessageComponent,
            NgIconComponent,
            UnitListCardComponent],
  providers: [provideIcons({ ...iconsList})],
  templateUrl: './program-academic-table.component.html',
  styleUrl: './program-academic-table.component.css'
})
export class ProgramAcademicTableComponent {

  displayedColumns: string[] = ['id', 'academic_program_bim', 'academic_program_start', 'academic_program_finish', 'unit','action'];
  @Input() dataSource:AcademicProgram[] = [];
  @Output() pageIndexEvent = new EventEmitter<number>();
  @Input() length:number = 10;

  pageIndex:number = 0;
  pageSize:number = 10;
  startPage:number = 0;
  endPage:number = 0;

  dialog =  inject(MatDialog);

  public dbService =  inject(DbService);
  public cacheService =  inject(CacheService);
  public loadingService =  inject(LoaddingService);
  public notificationService =  inject(NotificationService);

  constructor() {}

  editAcademicProgram(academicProgram:AcademicProgram) {

    const currentDialogRef = this.dialog.getDialogById('md-list-program-academic');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const {unit, ...onlyAcademicProgram} = academicProgram;
    const data:DialogData<AcademicProgram> = {
      update:true,
      data: onlyAcademicProgram as AcademicProgram
    };

    const dialogRef = this.dialog.open(FormProgramAcademicComponent, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pageIndexEvent.emit(this.pageIndex);
      }
    });
  }

  deleteAcademicProgram() {

    const currentDialogRef = this.dialog.getDialogById('md-list-program-academic');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const configModal = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Eliminar fecha de programación",
        message: "Considere que la se perderá la información."
      }
    })

    configModal.afterClosed().subscribe( res => {
      if(currentDialogRef){
        currentDialogRef.removePanelClass('hidden-dialog');
      }
    })
  }

  deleteUnit(unit:Unit) {

    const configModal = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Eliminar unidad",
        message: "Considere que la se perderá la información."
      }
    })

    configModal.afterClosed().subscribe( res => {
      if(res){
        this.confirmDeleteUnit(unit.id_unit);
      }
    })
  }

  confirmDeleteUnit(id_unit:number){
    this.dbService.deleteUnit(id_unit).subscribe({
      next:({message}) => {
        this.pageIndexEvent.emit(this.pageIndex);
        this.notificationService.success('Registro de unidad académica', message);
      },
    })
  }

  addUnit(academicProgram:AcademicProgram) {

    const {unit, academic_calendar, ...onlyAcademiProgram} = academicProgram;

    const data:DialogData<AcademicProgram> = {
      update:false,
      data: onlyAcademiProgram as AcademicProgram
    };

    const dialogRef = this.dialog.open(UnitFormComponent, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pageIndexEvent.emit(this.pageIndex);
      }
    });

  }

  updateUnit(unit:Unit) {

    const data:DialogData<Unit> = {
      update:true,
      data: unit
    };

    const dialogRef = this.dialog.open(UnitFormComponent, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pageIndexEvent.emit(this.pageIndex);
      }
    });

  }

  pageEvent(evn:PageEvent): void {

    this.endPage = evn.pageSize;
    this.startPage = evn.pageIndex * evn.pageSize;
    this.endPage = this.startPage + evn.pageSize;

    this.pageIndex = evn.pageIndex + 1;

    this.pageIndexEvent.emit(this.pageIndex);

  }

}
