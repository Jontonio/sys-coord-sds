import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MaterialModule } from '../../../../material/custom-material.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ListProgramAcademicComponent } from '../list-program-academic/list-program-academic.component';

@Component({
  selector: 'app-form-program-academic',
  standalone: true,
  imports: [MaterialModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-program-academic.component.html',
  styleUrl: './form-program-academic.component.css'
})
export class FormProgramAcademicComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(DialogRef);

  formAcademic:FormGroup = this.fb.group({

  })

  closeDialog(){
    if(this.formAcademic.dirty){
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

}
