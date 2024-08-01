import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CacheService } from '../../../../core/services/cache.service';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { Area } from '../../../interface/Area';
import { Section } from '../../../interface/Section';
import { Grade } from '../../../interface/Grade';
import { forkJoin } from 'rxjs';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';

@Component({
  selector: 'app-teacher-area-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, ShowForRolesDirective],
  templateUrl: './teacher-area-form.component.html',
  styleUrl: './teacher-area-form.component.css'
})
export class TeacherAreaFormComponent {

  private fb = inject(FormBuilder);
  public dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef);
  public cacheService = inject(CacheService);
  public dbService = inject(DbService);
  public notificationService = inject(NotificationService);
  public loadingService = inject(LoaddingService);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  areas:Area[] = [];
  sections:Section[] = [];
  grades:Grade[] = [];

  constructor(){
    this.loadInitialData();
    if(this.data.id_ie_teacher){
      this.id_ie_teacher.setValue(this.data.id_ie_teacher);
    }
  }

  loadInitialData() {
    forkJoin({
      areas: this.dbService.getAreas(),
      sections: this.dbService.getSections(),
      grades: this.dbService.getGrades()
    }).subscribe({
      next: (results) => {
        this.areas = results.areas.data.data;
        this.sections = results.sections.data.data;
        this.grades = results.grades.data.data;
      },
      error: (err) => {
        this.notificationService.error('Error', err.message);
      }
    });
  }

  formTeacherArea:FormGroup = this.fb.group({
    id_area:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)],],
    id_section:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)]],
    id_grade:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)]],
    id_ie_teacher:[null, [Validators.required, Validators.pattern(/^([0-9])*$/)]],
  })

  // getters
  get id_area() {
    return this.formTeacherArea.controls['id_area'];
  }
  get id_section() {
    return this.formTeacherArea.controls['id_section'];
  }
  get id_grade() {
    return this.formTeacherArea.controls['id_grade'];
  }
  get id_ie_teacher() {
    return this.formTeacherArea.controls['id_ie_teacher'];
  }

  getAreas(){
    this.dbService.getAreas().subscribe({
      next:({ data }) => {
        this.areas = data.data;
      },
    })
  }

  getSections() {
    this.dbService.getSections().subscribe({
      next:({ data }) => {
        this.areas = data.data;
      },
    })
  }

  getGrades() {
    this.dbService.getGrades().subscribe({
      next:({ data }) => {
        this.areas = data.data;
      },
    })
  }

  closeDialog(){
    if(this.formTeacherArea.dirty){
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

    if(this.formTeacherArea.invalid) {
      Object.keys(this.formTeacherArea.controls)
            .forEach( label => this.formTeacherArea.controls[label].markAllAsTouched())
      return;
    }

    this.dbService.addTeacherArea(this.formTeacherArea.getRawValue()).subscribe({
      next:({ message }) => {
        this.formTeacherArea.reset();
        this.dialogRef.close(true);
        this.notificationService.success('Asignación de docente área', message);
      },
    })
  }
}
