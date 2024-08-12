import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { InstitutionTeacher } from '../../../interface/InstitutionTeacher';
import { MatDialog } from '@angular/material/dialog';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../../../shared/icons/icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PageEvent } from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: InstitutionTeacher[] = [];

@Component({
  selector: 'app-teacher-area-table-assign',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, SkeletonComponent, ShowEmptyMessageComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './teacher-area-table-assign.component.html',
  styleUrl: './teacher-area-table-assign.component.css'
})
export class TeacherAreaTableAssignComponent {


  displayedColumns: string[] = ['id','names','coordinador', 'course', 'action'];

  @Input() dataSource = ELEMENT_DATA;

  dialog = inject(MatDialog);
  loadingService = inject(LoaddingService);
  notificationService = inject(NotificationService);
  expandedElement: any | null;

  @Output() pageIndexEvent = new EventEmitter<number>();
  @Input() length:number = 10;
  pageIndex:number = 0;
  pageSize:number = 10;
  startPage:number = 0;
  endPage:number = 0;

  toggleRow(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  pageEvent(evn:PageEvent): void {

    this.endPage = evn.pageSize;
    this.startPage = evn.pageIndex * evn.pageSize;
    this.endPage = this.startPage + evn.pageSize;

    this.pageIndex = evn.pageIndex + 1;

    this.pageIndexEvent.emit(this.pageIndex);

  }

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


}
