import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-college-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './college-form.component.html',
  styleUrl: './college-form.component.css'
})
export class CollegeFormComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);

  formCollege:FormGroup = this.fb.group({
    name_college:[null, Validators.required]
  })

  // getters
  get name_college(){
    return this.formCollege.controls['name_college'];
  }

  closeDialog(){
    if(this.formCollege.dirty){
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
    if(this.formCollege.invalid){
      Object.keys(this.formCollege.controls).forEach(label => this.formCollege.controls[label].markAsTouched())
      return;
    }
    this.dbService.addCollege(this.formCollege.value).subscribe({
      next:({ message }) => {
        this.formCollege.reset();
        this.dialogRef.close(false);
        this.notificationService.success('Registro de colegiado', message);
      }
    })
  }
}
