import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyErrorStateMatcher } from '../../../teacher/components/teacher-form/teacher-form.component';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../../core/services/notification.service';
import { DbService } from '../../../../core/services/db.service';

@Component({
  selector: 'app-school-subject-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './school-subject-form.component.html',
  styleUrl: './school-subject-form.component.css'
})
export class SchoolSubjectFormComponent {

  formSchoolSubject!:FormGroup;
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  notificationService = inject(NotificationService);
  dbService = inject(DbService);

  matcher = new MyErrorStateMatcher();

  constructor() {
    this.createForm();
  }

  createForm() {
    this.formSchoolSubject = new FormGroup({
      area_name: new FormControl(null, [ Validators.required, Validators.maxLength(200)]),
    })
  }

  closeDialog(){
    if(this.formSchoolSubject.dirty){
      const configModal = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "¿Esta seguro abandonar el registro?",
          message: "Hay campos con información. Salir implica perder los datos."
        }
      })
      configModal.afterClosed().subscribe( res => {
        if(res){
          this.dialogRef.close(false);
        }
      })
      return;
    }
    this.dialogRef.close(false);
  }

  // getters
  get area_name(){
    return this.formSchoolSubject.controls['area_name']
  }

  save() {
    if(this.formSchoolSubject.invalid){
      Object.keys( this.formSchoolSubject.controls )
            .forEach( label => this.formSchoolSubject.controls[ label ].markAsTouched() )
      return;
    }

    this.dbService.addArea(this.formSchoolSubject.value).subscribe({
      next:({ message }) => {
        this.formSchoolSubject.reset();
        this.dialogRef.close(true);
        this.notificationService.success('Registro de área', message)
      },
    })
  }
}
