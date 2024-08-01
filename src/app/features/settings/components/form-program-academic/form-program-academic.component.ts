import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MaterialModule } from '../../../../material/custom-material.module';
import { DateAdapter, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { CacheService } from '../../../../core/services/cache.service';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-program-academic',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, ShowForRolesDirective],
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-program-academic.component.html',
  styleUrl: './form-program-academic.component.css'
})
export class FormProgramAcademicComponent {

  fb = inject(FormBuilder);
  dialog = inject(MatDialog);
  dialogRef = inject(DialogRef);
  cacheService = inject(CacheService);
  dbService = inject(DbService);
  notificationService = inject(NotificationService);

  formAcademic:FormGroup = this.fb.group({
    modular_code:[null, [Validators.required, Validators.pattern(/^([0-9])*$/),  Validators.maxLength(7), Validators.minLength(7)]],
    academic_program_bim:[null, Validators.required],
    academic_program_start:[null, Validators.required],
    academic_program_finish:[null, Validators.required],
    id_academic_calendar:[null, Validators.required],
  })

  ngOnInit(): void {

    if(this.cacheService.getCodeModularUser()){
      this.modular_code.setValue(this.cacheService.getCodeModularUser());
    }

    if(this.cacheService.getAcademicCalendar()){
      this.id_academic_calendar.setValue(this.cacheService.getAcademicCalendar().id_academic_calendar)
    }

  }

  // getters
  get modular_code() {
    return this.formAcademic.controls['modular_code'];
  }
  get academic_program_bim() {
    return this.formAcademic.controls['academic_program_bim'];
  }
  get academic_program_start() {
    return this.formAcademic.controls['academic_program_start'];
  }
  get academic_program_finish() {
    return this.formAcademic.controls['academic_program_finish'];
  }
  get id_academic_calendar() {
    return this.formAcademic.controls['id_academic_calendar'];
  }

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

  save() {

    if(this.formAcademic.invalid) {
      Object.keys(this.formAcademic.controls)
            .forEach( label => this.formAcademic.controls[label].markAllAsTouched())
      return;
    }

    if(this.cacheService.getCodeModularUser()){
      this.modular_code.setValue(this.cacheService.getCodeModularUser());
    }

    if(this.cacheService.getAcademicCalendar()){
      this.id_academic_calendar.setValue(this.cacheService.getAcademicCalendar().id_academic_calendar)
    }

    this.academic_program_finish.setValue(moment(this.academic_program_finish.value).format('YYYY-MM-DD\THH:mm'))
    this.academic_program_start.setValue(moment(this.academic_program_start.value).format('YYYY-MM-DD\THH:mm'))

    this.dbService.addAcademicProgram(this.formAcademic.getRawValue()).subscribe({
      next:({ message }) => {
        this.formAcademic.reset();
        this.dialogRef.close(false);
        this.notificationService.success('Registro de programación académica', message);
      },
    })
  }
}
