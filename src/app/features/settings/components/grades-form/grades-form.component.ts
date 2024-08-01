import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-grades-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './grades-form.component.html',
  styleUrl: './grades-form.component.css'
})
export class GradesFormComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(DialogRef);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);

  formGrades:FormGroup = this.fb.group({
    grade_name:[null, [Validators.required, Validators.pattern('^[0-9]+$')]]
  })

  //getters
  get grade_name(){
    return this.formGrades.controls['grade_name'];
  }

  closeDialog(){
    if(this.formGrades.dirty){
      const configModal = this.dialog.open(ConfirmDialogComponent, {
        data:{
          title: "¿Esta seguro abandonar el registro?",
          message: "Hay campos con información. Salir implica perder los datos."
        }
      })
      configModal.afterClosed().subscribe( res => res?this.dialogRef.close(false):null)
      return;
    }
    this.dialogRef.close(false);
  }

  save(){
    if(this.formGrades.invalid){
      Object.keys(this.formGrades.controls)
      .forEach( label => this.formGrades.controls[label].markAllAsTouched())
      return;
    }

    this.dbService.addGrade(this.formGrades.value).subscribe({
      next:({ message }) => {
        this.formGrades.reset();
        this.dialogRef.close(false);
        this.notificationService.success('Registro del grado', message);
      },
    })
  }

}
