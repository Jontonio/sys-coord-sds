import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { GradesFormComponent } from '../grades-form/grades-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { Grade } from '../../../interface/Grade';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';

const ELEMENT_DATA: Grade[] = [];

@Component({
  selector: 'app-grades-list',
  standalone: true,
  imports: [MaterialModule, SkeletonComponent, ShowEmptyMessageComponent],
  templateUrl: './grades-list.component.html',
  styleUrl: './grades-list.component.css'
})
export class GradesListComponent {

  displayedColumns: string[] = ['id_grade', 'grade_name', 'action'];
  dataSource = ELEMENT_DATA;
  dialog =  inject(MatDialog);
  dialogRef =  inject(DialogRef);
  public dbService =  inject(DbService);
  public loadingService = inject(LoaddingService);

  constructor() {
    this.getGrades();
  }

  getGrades() {
    this.dbService.getGrades().subscribe({
      next:({ data }) => {
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

    const dialogRef = this.dialog.open(GradesFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
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
        title: "Eliminar grado",
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
