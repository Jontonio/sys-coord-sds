import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormProgramAcademicComponent } from '../form-program-academic/form-program-academic.component';
import { DbService } from '../../../../core/services/db.service';
import { CacheService } from '../../../../core/services/cache.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  document: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-list-program-academic',
  standalone: true,
  imports: [MaterialModule, SkeletonComponent, ShowEmptyMessageComponent],
  templateUrl: './list-program-academic.component.html',
  styleUrl: './list-program-academic.component.css'
})
export class ListProgramAcademicComponent {

  displayedColumns: string[] = ['id', 'academic_program_bim', 'academic_program_start', 'academic_program_finish', 'action'];
  dataSource = ELEMENT_DATA;
  dialog =  inject(MatDialog);
  dialogRef =  inject(DialogRef);
  public dbService =  inject(DbService);
  public cacheService =  inject(CacheService);
  public loadingService =  inject(LoaddingService);

  closeDialog(){
    this.dialogRef.close(false);
  }

  constructor() {

  }

  ngOnInit(): void {
    if(this.cacheService.getAcademicCalendar() && this.cacheService.getCodeModularUser()){
      const data = {
        'modular_code':this.cacheService.getCodeModularUser(),
        'id_academic_calendar': this.cacheService.getAcademicCalendar().id_academic_calendar }
      this.getAcademicsProgramsFromIE(data);
    }
  }

  getAcademicsProgramsFromIE({modular_code, id_academic_calendar}:any) {
    this.dbService.getAcademicProgramsFromIE({modular_code, id_academic_calendar}).subscribe({
      next:({ data }) => {
        this.dataSource = data.data;
      },
    })
  }


  editAcademicProgram() {

    const currentDialogRef = this.dialog.getDialogById('md-list-program-academic');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const dialogRef = this.dialog.open(FormProgramAcademicComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(currentDialogRef){
        currentDialogRef.removePanelClass('hidden-dialog');
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
}
