import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { MatDialog } from '@angular/material/dialog';
import { PreviewFileComponent } from '../../../../shared/components/preview-file/preview-file.component';

@Component({
  selector: 'app-class-unit-item-tree',
  standalone: true,
  imports: [MaterialModule, NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './class-unit-item-tree.component.html',
  styleUrl: './class-unit-item-tree.component.css'
})
export class ClassUnitItemTreeComponent {

  dialog = inject(MatDialog);

  previewFile() {
    const dialogRef = this.dialog.open(PreviewFileComponent, {
      data: {name: "Messy", animal: "cat"},
      autoFocus: false,
      width: '90%',
      maxWidth: '900px',
      height: '80%',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
