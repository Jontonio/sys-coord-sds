import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../material/custom-material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-academic-calendar-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './academic-calendar-form.component.html',
  styleUrl: './academic-calendar-form.component.css'
})
export class AcademicCalendarFormComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(DialogRef);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);

  formAcademicCalendar:FormGroup = this.fb.group({
    academic_calendar_year:[null, [Validators.required, Validators.pattern('^[0-9]+$')]]
  })

  // getters
  get academic_calendar_year(){
    return this.formAcademicCalendar.controls['academic_calendar_year'];
  }

  closeDialog(){
    if(this.formAcademicCalendar.dirty){
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
    if(this.formAcademicCalendar.invalid){
      Object.keys(this.formAcademicCalendar.controls).forEach(label => this.formAcademicCalendar.controls[label].markAsTouched())
      return;
    }
    this.dbService.addAcademicCalendar(this.formAcademicCalendar.value).subscribe({
      next:({ message }) => {
        this.formAcademicCalendar.reset();
        this.dialogRef.close(false);
        this.notificationService.success('Registro del calendario académico ', message);
      }
    })
  }

}
