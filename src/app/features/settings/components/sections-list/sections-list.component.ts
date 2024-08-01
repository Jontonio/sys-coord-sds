import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SectionsFormComponent } from '../sections-form/sections-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { Section } from '../../../interface/Section';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';


const ELEMENT_DATA: Section[] = [];

@Component({
  selector: 'app-sections-list',
  standalone: true,
  imports: [MaterialModule, SkeletonComponent, ShowEmptyMessageComponent],
  templateUrl: './sections-list.component.html',
  styleUrl: './sections-list.component.css'
})
export class SectionsListComponent {

  public displayedColumns: string[] = ['id_section', 'section_name', 'action'];
  public dataSource = ELEMENT_DATA;
  public dialog =  inject(MatDialog);
  public dialogRef =  inject(DialogRef);
  public dbService =  inject(DbService);
  public loadingService = inject(LoaddingService);

  constructor() {
    this.getSections();
  }

  getSections() {
    this.loadingService.setLoadding(true);
    this.dbService.getSections().subscribe({
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

    const currentDialogRef = this.dialog.getDialogById('md-sections-list');

    if (currentDialogRef) {
      currentDialogRef.addPanelClass('hidden-dialog');
    }

    const dialogRef = this.dialog.open(SectionsFormComponent, {
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

    const currentDialogRef = this.dialog.getDialogById('md-sections-list');

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
