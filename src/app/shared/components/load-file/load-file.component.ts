import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/custom-material.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../icons/icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';
import { DbService } from '../../../core/services/db.service';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

@Component({
  selector: 'app-load-file',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, ReactiveFormsModule],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './load-file.component.html',
  styleUrl: './load-file.component.css'
})
export class LoadFileComponent {

  files:any[] = [];
  private fb = inject(FormBuilder);
  private dbService = inject(DbService);
  private dialogRef = inject(MatDialogRef);
  private notificationService = inject(NotificationService);

  readonly data = inject<any>(MAT_DIALOG_DATA);

  formLoadFile:FormGroup = this.fb.group({
    id_teacher_area:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)]],
    class_unit_title:[null, [Validators.required, Validators.maxLength(150)]],
    class_unit_description:[null],
    id_unit:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)]],
    unit_file:[null],
    showMoreFields:[false]
  })

  constructor(){

    if(this.data.id_unit && this.data.id_teacher_area){
      this.id_unit.setValue(this.data.id_unit)
      this.id_teacher_area.setValue(this.data.id_teacher_area)
    }

  }

  // getters
  get id_teacher_area() {
    return this.formLoadFile.controls['id_teacher_area'];
  }
  get class_unit_title() {
    return this.formLoadFile.controls['class_unit_title'];
  }
  get class_unit_description() {
    return this.formLoadFile.controls['class_unit_description'];
  }
  get id_unit() {
    return this.formLoadFile.controls['id_unit'];
  }
  get showMoreFields() {
    return this.formLoadFile.controls['showMoreFields'];
  }
  get unit_file() {
    return this.formLoadFile.controls['unit_file'];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.add('dragover');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('dragover');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('dragover');
    }

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      if (files[0].type !== 'application/pdf') {
        this.notificationService.warning("Validación de datos", "Solo se permiten archivos pdf")
        return;
      }
      this.files = files as any;
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = input.files;
      if (files[0].type !== 'application/pdf') {
        this.notificationService.warning("Validación de datos", "Solo se permiten archivos pdf")
        return;
      }
      this.files = files as any;
    }
  }

  changeCheckbox() {
    if(this.showMoreFields.value){
      this.class_unit_description.markAsPristine()
      this.class_unit_description.addValidators([Validators.required, Validators.maxLength(350)])
    }else{
      this.class_unit_description.reset()
      this.class_unit_description.clearValidators()
      this.class_unit_description.markAsPristine()
    }
     this.class_unit_description.updateValueAndValidity();
  }

  save(){

    if(this.files.length==0){
      this.notificationService.warning('Validación de datos', 'Selecione al menos un archivo para continuar')
      return;
    }

    if(this.formLoadFile.invalid) {
      Object.keys(this.formLoadFile.controls).forEach(label => this.formLoadFile.controls[label].markAllAsTouched())
      return;
    }

    const formData = new FormData();

    formData.append("id_teacher_area", this.id_teacher_area.value);
    formData.append("class_unit_title", this.class_unit_title.value?this.class_unit_title.value:'Sin título');
    formData.append("class_unit_description", this.class_unit_description.value?this.class_unit_description.value:'Sin descripción');
    formData.append("file", this.files[0]);
    formData.append("id_unit", this.id_unit.value);

    this.dbService.addClassUnit(formData).subscribe({
      next:({ message }) => {
        this.dialogRef.close(true);
        this.notificationService.success('Registro de unidad', message);
      },
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

}
