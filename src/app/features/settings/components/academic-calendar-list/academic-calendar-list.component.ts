import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DbService } from '../../../../core/services/db.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { AcademicCalendarFormComponent } from '../academic-calendar-form/academic-calendar-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { AcademicCalendar } from '../../../interface/AcademicCalendar';
import { MaterialModule } from '../../../../material/custom-material.module';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';

const ELEMENT_DATA: AcademicCalendar[] = [];


@Component({
  selector: 'app-academic-calendar-list',
  standalone: true,
  imports: [MaterialModule, SkeletonComponent, ShowEmptyMessageComponent],
  templateUrl: './academic-calendar-list.component.html',
  styleUrl: './academic-calendar-list.component.css'
})
export class AcademicCalendarListComponent {


  displayedColumns: string[] = ['id_academic_calendar', 'academic_calendar_year', 'action'];
  dataSource = ELEMENT_DATA;
  dialog =  inject(MatDialog);
  dialogRef =  inject(DialogRef);
  public dbService =  inject(DbService);
  public loadingService = inject(LoaddingService);

  constructor() {
    this.getAcademicCalendars();
  }

  getAcademicCalendars() {
    this.loadingService.setLoadding(true);
    this.dbService.getAcademicCalendars().subscribe({
      next:({ data }) => {
        this.loadingService.setLoadding(false);
        this.dataSource = data.data;
      },
    })
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  editGrade() {

    const currentDialogRef = this.dialog.getDialogById('md-grades-list');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const dialogRef = this.dialog.open(AcademicCalendarFormComponent, {
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

  deleteGrade() {

    const currentDialogRef = this.dialog.getDialogById('md-grades-list');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const configModal = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Eliminar calendario académico",
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
