import { Component, inject } from '@angular/core';
import { College } from '../../../interface/College';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../../../../core/services/db.service';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { CollegeFormComponent } from '../college-form/college-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

const ELEMENT_DATA: College[] = [];


@Component({
  selector: 'app-college-list',
  standalone: true,
  imports: [MaterialModule, ShowEmptyMessageComponent, SkeletonComponent],
  templateUrl: './college-list.component.html',
  styleUrl: './college-list.component.css'
})
export class CollegeListComponent {

  public displayedColumns: string[] = ['id_college', 'name_college', 'action'];
  public dataSource = ELEMENT_DATA;
  public dialog =  inject(MatDialog);
  public dialogRef =  inject(MatDialogRef);
  public dbService =  inject(DbService);
  public loadingService = inject(LoaddingService);

  constructor() {
    this.getColleges();
  }

  getColleges() {
    this.loadingService.setLoadding(true);
    this.dbService.getColleges().subscribe({
      next:({ data }) => {
        this.loadingService.setLoadding(false);
        this.dataSource = data.data;
      },
    })
  }

  closeDialog(){
    this.dialogRef.close(false);
  }

  editSection() {

    const currentDialogRef = this.dialog.getDialogById('md-college-list');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const dialogRef = this.dialog.open(CollegeFormComponent, {
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

  deleteSection() {

    const currentDialogRef = this.dialog.getDialogById('md-college-list');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const configModal = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Eliminar sección",
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
