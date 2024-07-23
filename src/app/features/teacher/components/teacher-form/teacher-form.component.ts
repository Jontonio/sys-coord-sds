import { Component, inject, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../../../shared/confirm-dialog/confirm-dialog.component';

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
  dialogRef = inject(DialogRef);
  dialog = inject(MatDialog);

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
      name: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      first_name: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      last_name: new FormControl(null, [ Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]),
      email: new FormControl(null, [ Validators.required, Validators.email]),
      celphone_number: new FormControl(null, [ Validators.required, Validators.pattern(/^([0-9])*$/), Validators.maxLength(9), Validators.minLength(9)]),
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
  get name(){
    return this.formTeacher.controls['name']
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
  get celphone_number(){
    return this.formTeacher.controls['celphone_number']
  }

  registerTeacher() {
    if(this.formTeacher.invalid){
      Object.keys( this.formTeacher.controls )
            .forEach( label => this.formTeacher.controls[ label ].markAsTouched() )
      return;
    }
    console.log(this.formTeacher.value)
  }

}
