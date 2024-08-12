import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { of, switchMap } from 'rxjs';
import { CacheService } from '../../../../core/services/cache.service';
import { LoaddingService } from '../../../../core/services/loadding.service';

interface TypeDocument {
  code: string,
  label: string
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {

  formTeacher!:FormGroup;
  dialogRef = inject(MatDialogRef);
  dialog = inject(MatDialog);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);
  cacheService = inject(CacheService);
  loadingService = inject(LoaddingService);

  matcher = new MyErrorStateMatcher();

  listTypeDocuments: TypeDocument[] = [
    {
      code: "DNI",
      label: "DNI"
    },
    {
      code: "CDE",
      label: "CARNET DE EXTRANJERÍA"
    },
    {
      code: "P",
      label: "PASAPORTE"
    }
  ]

  constructor() {
    this.createForm();
  }

  createForm() {
    this.formTeacher = new FormGroup({
      type_id_card: new FormControl(null, [ Validators.required ]),
      id_card: new FormControl(null, [ Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^[0-9]*$/)]),
      names: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      first_name: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      last_name: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      email: new FormControl(null, [ Validators.required, Validators.email]),
      phone_number: new FormControl(null, [ Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(9), Validators.minLength(9)]),
    })
  }

  closeDialog(){
    if(this.formTeacher.dirty){
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
  get type_id_card(){
    return this.formTeacher.controls['type_id_card']
  }
  get id_card(){
    return this.formTeacher.controls['id_card']
  }
  get names(){
    return this.formTeacher.controls['names']
  }
  get first_name(){
    return this.formTeacher.controls['first_name']
  }
  get last_name(){
    return this.formTeacher.controls['last_name']
  }
  get email(){
    return this.formTeacher.controls['email']
  }
  get phone_number(){
    return this.formTeacher.controls['phone_number']
  }

  validateTeacher(){
    if(this.id_card.invalid) return;

    this.dbService.getTeacherByDocument(this.id_card.value)
    .pipe(
      switchMap(response => {
        return (response && response.data)?of(response):this.dbService.getRENIEC(this.id_card.value);
    }))
    .subscribe({
      next:({ data }) => {
        this.resetFormExceptOne('type_id_card');
        this.formTeacher.patchValue(data)
      },
    })
  }

  resetFormExceptOne(fieldToKeep: string) {
    const valueToKeep = this.formTeacher.get(fieldToKeep)?.value;
    this.formTeacher.reset();
    if (valueToKeep !== undefined) {
      this.formTeacher.get(fieldToKeep)?.setValue(valueToKeep);
    }
  }

  registerTeacher() {

    if(this.formTeacher.invalid){
      Object.keys( this.formTeacher.controls )
            .forEach( label => this.formTeacher.controls[ label ].markAsTouched() )
      return;
    }

    if(!this.cacheService.getCodeModularUser()){
      this.notificationService.warning('Registro de docente', 'Es necesario el código modular de la institución');
      return;
    }

    this.dbService.addTeacher(this.formTeacher.value)
    .pipe(
      switchMap((res) => {
        const id_card = this.id_card.value;
        const modular_code = this.cacheService.getCodeModularUser();
        return this.dbService.addInstitutionTeacher({ id_card, modular_code } as any);
      })
    )
    .subscribe({
      next:({ message }) => {
        this.formTeacher.reset();
        this.dialogRef.close(true);
        this.notificationService.success('Registro de docente', message);
      },
    })
  }

}
