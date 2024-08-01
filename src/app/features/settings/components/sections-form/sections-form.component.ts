import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-sections-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './sections-form.component.html',
  styleUrl: './sections-form.component.css'
})
export class SectionsFormComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);

  formGrades:FormGroup = this.fb.group({
    section_name:[null, [Validators.required, Validators.pattern('^[A-Za-z" ]+$')]]
  })

  // getters
  get section_name(){
    return this.formGrades.controls['section_name'];
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
      Object.keys(this.formGrades.controls).forEach(label => this.formGrades.controls[label].markAsTouched())
      return;
    }
    this.dbService.addSection(this.formGrades.value).subscribe({
      next:({ message }) => {
        this.formGrades.reset();
        this.dialogRef.close(false);
        this.notificationService.success('Registro de la sección', message);
      }
    })
  }

}
