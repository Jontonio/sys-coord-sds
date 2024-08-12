import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CacheService } from '../../../../core/services/cache.service';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import moment from 'moment';
import { DialogData } from '../../../interface/DialogData';
import { AcademicProgram } from '../../../interface/AcademicProgram';
import { LoadingSaveComponent } from "../../../../shared/components/loading-save/loading-save.component";
import { LoaddingService } from '../../../../core/services/loadding.service';
import { Unit } from '../../../interface/Unit';

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
  selector: 'app-unit-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, ShowForRolesDirective, LoadingSaveComponent],
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent {

  readonly dialogData = inject<DialogData<Unit>>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);

  cacheService = inject(CacheService);
  dbService = inject(DbService);
  _loading = inject(LoaddingService);
  notificationService = inject(NotificationService);
  update:boolean;

  unitForm:FormGroup = this.fb.group({
    unit_description:[null, Validators.maxLength(350)],
    unit_name:[null, [Validators.required, Validators.maxLength(200)]],
    unit_start:[null, Validators.required],
    unit_finish:[null, Validators.required],
    id_academic_program:[null, Validators.required],
    showMoreFields:[false]
  })

  constructor() {
    this.update = false;
    this.setupValuesForm(this.dialogData);
  }

  setupValuesForm(dialogData:DialogData<Unit>){
    const data = dialogData.data;
    if(dialogData.update) {
      this.update = true;
      this.unit_name.setValue(this.dialogData.data?.unit_name)
      this.unit_start.setValue(this.dialogData.data?.unit_start)
      this.unit_finish.setValue(this.dialogData.data?.unit_finish)
      this.id_academic_program.setValue(this.dialogData.data?.id_academic_program)
      if(this.dialogData.data?.unit_description){
        this.showMoreFields.setValue(true);
        this.unit_description.setValue(this.dialogData.data?.unit_description)
      }
    }else {
      this.id_academic_program.setValue(data?.id_academic_program);
    }
  }

  // getters
  get unit_description() {
    return this.unitForm.controls['unit_description'];
  }
  get unit_name() {
    return this.unitForm.controls['unit_name'];
  }
  get unit_start() {
    return this.unitForm.controls['unit_start'];
  }
  get unit_finish() {
    return this.unitForm.controls['unit_finish'];
  }
  get id_academic_program() {
    return this.unitForm.controls['id_academic_program'];
  }
  get showMoreFields() {
    return this.unitForm.controls['showMoreFields'];
  }

  closeDialog(){
    if(this.unitForm.dirty){
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

  changeCheckbox() {
    if(this.showMoreFields.value){
      this.unit_description.markAsPristine()
      this.unit_description.addValidators([Validators.required, Validators.maxLength(350)])
    }else{
      this.unit_description.reset()
      this.unit_description.clearValidators()
      this.unit_description.markAsPristine()
    }
     this.unit_description.updateValueAndValidity();
  }

  save() {

    if(this.unitForm.invalid) {
      Object.keys(this.unitForm.controls)
            .forEach( label => this.unitForm.controls[label].markAllAsTouched())
      return;
    }

    this.unit_finish.setValue(moment(this.unit_finish.value).format('YYYY-MM-DD\THH:mm'))
    this.unit_start.setValue(moment(this.unit_start.value).format('YYYY-MM-DD\THH:mm'))

    this.update?this.updateUnit():this.registerUnit();
  }

  registerUnit() {
    this.dbService.addUnit(this.unitForm.getRawValue()).subscribe({
      next:({ message }) => {
        this.unitForm.reset();
        this.dialogRef.close(true);
        this.notificationService.success('Registro de unidad académica', message);
      },
    })
  }

  updateUnit() {
    this.dbService.updateUnit(this.dialogData.data!.id_unit, this.unitForm.getRawValue()).subscribe({
      next:({ message }) => {
        this.unitForm.reset();
        this.dialogRef.close(true);
        this.notificationService.success('Actualización de unidad académica', message);
      },
    })
  }

}
