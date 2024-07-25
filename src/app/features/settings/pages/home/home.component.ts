import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { FormProgramAcademicComponent } from '../../components/form-program-academic/form-program-academic.component';
import { ListProgramAcademicComponent } from '../../components/list-program-academic/list-program-academic.component';
import { GradesFormComponent } from '../../components/grades-form/grades-form.component';
import { GradesListComponent } from '../../components/grades-list/grades-list.component';
import { SectionsFormComponent } from '../../components/sections-form/sections-form.component';
import { SectionsListComponent } from '../../components/sections-list/sections-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

  private dialog = inject(MatDialog);

  addProgram() {
    const dialogRef = this.dialog.open(FormProgramAcademicComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addGrades() {
    const dialogRef = this.dialog.open(GradesFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addSections() {
    const dialogRef = this.dialog.open(SectionsFormComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  showListProgram() {
    const configModal = this.dialog.open(ListProgramAcademicComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
      id: 'md-list-program-academic'
    });

    configModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  showListGrades() {
    const configModal = this.dialog.open(GradesListComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      id: 'md-grades-list'
    });

    configModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  showListSections() {
    const configModal = this.dialog.open(SectionsListComponent, {
      data: {name: "Messy", animal: "cat"},
      disableClose: true,
      autoFocus: false,
      id: 'md-sections-list'
    });

    configModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
