import { Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/custom-material.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../icons/icons';
import { heroUsers } from '@ng-icons/heroicons/outline';

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/svg+xml',
];

@Component({
  selector: 'app-load-file',
  standalone: true,
  imports: [MaterialModule, NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './load-file.component.html',
  styleUrl: './load-file.component.css'
})
export class LoadFileComponent {

  files:any[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Previene el comportamiento por defecto
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.add('dragover');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('dragover');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
      dropzone.classList.remove('dragover');
    }

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      console.log('Archivos arrastrados:', files);

      this.files = files as any;
      console.log(files)
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const files = input.files;
      this.files = files as any;
      console.log(files)
    }
  }

}
