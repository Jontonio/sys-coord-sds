import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { FormProgramAcademicComponent } from '../form-program-academic/form-program-academic.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  document: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', document:'518598555', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', document:'518598555', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', document:'518598555', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', document:'518598555', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', document:'518598555', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', document:'518598555', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', document:'518598555', weight: 14.0067, symbol: 'N'},
];

@Component({
  selector: 'app-list-program-academic',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './list-program-academic.component.html',
  styleUrl: './list-program-academic.component.css'
})
export class ListProgramAcademicComponent {

  displayedColumns: string[] = ['bimestre', 'date_start', 'date_finish', 'action'];
  dataSource = ELEMENT_DATA;
  dialog =  inject(MatDialog);
  dialogRef =  inject(DialogRef);

  closeDialog(){
    this.dialogRef.close(false);
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
