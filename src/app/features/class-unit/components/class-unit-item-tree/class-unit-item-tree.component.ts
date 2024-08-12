import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewFileComponent } from '../../../../shared/components/preview-file/preview-file.component';
import { ClassUnit } from '../../../interface/ClassUnit';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';
import { DbService } from '../../../../core/services/db.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ShowForRolesDirective } from '../../../directives/show-for-roles.directive';
import { Unit } from '../../../interface/Unit';

@Component({
  selector: 'app-class-unit-item-tree',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, ShowForRolesDirective],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './class-unit-item-tree.component.html',
  styleUrl: './class-unit-item-tree.component.css'
})
export class ClassUnitItemTreeComponent {

  dialog = inject(MatDialog);
  notificationService = inject(NotificationService);
  dbService = inject(DbService);

  @Input() classUnit!:ClassUnit;
  @Input() unit!:Unit;

  previewFile() {
    const data = this.classUnit;
    const dialogRef = this.dialog.open(PreviewFileComponent, {
      data,
      autoFocus: false,
      width: '90%',
      maxWidth: '900px',
      height: '80%',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateChecked(classUnit: ClassUnit){

    const modalRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        title: "Actualizar estado de unidad",
        message: classUnit.verified==true?"¿Está seguro de marcar como no verificado?":"¿Está seguro de marcar como verificado?"
      }
    })

    modalRef.afterClosed().subscribe( res => {
      if(res){
        this.dbService.updateVerifiedClassUnit(classUnit.id_class_unit, {'verified':classUnit.verified} as ClassUnit).subscribe({
          next:({ data, message }) => {
            this.notificationService.success('Actualización de datos', message);
            this.classUnit = data;
          },
        })
      }
    })

  }

}
