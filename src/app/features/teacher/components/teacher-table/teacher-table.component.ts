import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { InstitutionTeacher } from '../../../interface/InstitutionTeacher';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { TeacherAreaFormComponent } from '../teacher-area-form/teacher-area-form.component';
import { NotificationService } from '../../../../core/services/notification.service';
import { FormUserTeacherComponent } from '../../../auth/components/form-user-teacher/form-user-teacher.component';
import { PageEvent } from '@angular/material/paginator';
import { CacheService } from '../../../../core/services/cache.service';

@Component({
  selector: 'app-teacher-table',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, SkeletonComponent, ShowEmptyMessageComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './teacher-table.component.html',
  styleUrl: './teacher-table.component.css'
})
export class TeacherTableComponent {

  displayedColumns: string[] = ['id', 'id_card', 'names', 'contact', 'action'];
  cacheService = inject(CacheService);

  @Input() dataSource:InstitutionTeacher[] = [];;

  dialog = inject(MatDialog);
  loadingService = inject(LoaddingService);
  notificationService = inject(NotificationService);

  @Output() pageIndexEvent = new EventEmitter<number>();
  @Input() length:number = 10;

  pageIndex:number = 0;
  pageSize:number = 10;
  startPage:number = 0;
  endPage:number = 0;

  deleteTeacher() {

    const modalRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Eliminar docente",
        message: "¿Está seguro de eliminar al docente de la institución?"
      }
    })

    modalRef.afterClosed().subscribe( res => {
      console.log(res)
    })
  }

  pageEvent(evn:PageEvent): void {

    this.endPage = evn.pageSize;
    this.startPage = evn.pageIndex * evn.pageSize;
    this.endPage = this.startPage + evn.pageSize;

    this.pageIndex = evn.pageIndex + 1;

    this.pageIndexEvent.emit(this.pageIndex);

  }

  assignAreaWork(id_ie_teacher:number){

    const modalRef = this.dialog.open(TeacherAreaFormComponent, {
      data: { id_ie_teacher },
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    })

    modalRef.afterClosed().subscribe( res => {
      console.log(res)
    })

  }

  addNewUser(data:InstitutionTeacher) {
    const modalRef = this.dialog.open(FormUserTeacherComponent, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass:'dialog-class',
    })

    modalRef.afterClosed().subscribe( res => {
      console.log(res)
    })
  }

}
