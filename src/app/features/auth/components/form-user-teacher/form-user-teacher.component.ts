import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../teacher/components/teacher-form/teacher-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InstitutionTeacher } from '../../../interface/InstitutionTeacher';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-form-user-teacher',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './form-user-teacher.component.html',
  styleUrl: './form-user-teacher.component.css'
})
export class FormUserTeacherComponent {

  private dialogRef = inject(MatDialogRef);
  private dbService = inject(DbService);
  private notificationService = inject(NotificationService);

  private fb = inject(FormBuilder);
  matcher = new MyErrorStateMatcher();
  readonly data = inject<InstitutionTeacher>(MAT_DIALOG_DATA);

  formUserTeacher:FormGroup = this.fb.group({
    id_card_user:[null, [ Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^[0-9]*$/)]],
    name:[null, [Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
    surname_user:[null, [Validators.required, Validators.pattern(/^([a-z ñáéíóú]{2,60})$/i)]],
    email:[null, [Validators.required, Validators.email]],
    cod_modular_ie:[null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    id_ie_teacher:[null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
  })

  constructor() {
    this.formUserTeacher.disable();
    if(this.data){
      this.id_card_user.setValue(this.data.id_card);
      this.name.setValue(this.data.teacher.names);
      this.surname_user.setValue(`${this.data.teacher.first_name} ${this.data.teacher.last_name}`);
      this.email.setValue(this.data.teacher.email);
      this.cod_modular_ie.setValue(this.data.modular_code);
      this.id_ie_teacher.setValue(this.data.id_ie_teacher);
    }
  }

  //getters
  get id_card_user() {
    return this.formUserTeacher.controls['id_card_user'];
  }
  get name() {
    return this.formUserTeacher.controls['name'];
  }
  get surname_user() {
    return this.formUserTeacher.controls['surname_user'];
  }
  get email() {
    return this.formUserTeacher.controls['email'];
  }
  get cod_modular_ie() {
    return this.formUserTeacher.controls['cod_modular_ie'];
  }
  get id_ie_teacher() {
    return this.formUserTeacher.controls['id_ie_teacher'];
  }

  save(){

    if(this.formUserTeacher.invalid) {
      Object.keys(this.formUserTeacher.controls)
            .forEach( label => this.formUserTeacher.controls[label].markAllAsTouched())
      return;
    }
    this.dbService.addUser(this.formUserTeacher.value)
    .pipe(
      switchMap(res => {
        const id_user = res.data.id;
        // TODO: CHANGE THIS CODE NOW
        const data = {
          "role": ["docente_user"],
          "permission": [
              { "name":"area-list" }
          ]
      }
        return this.dbService.AsingRolesAndPermissionUser(id_user, data)
      })
    )
    .subscribe({
      next:({ message }) => {
        this.dialogRef.close(true)
        this.notificationService.success('Registro de usurio', message)
      },
    })
  }

}
