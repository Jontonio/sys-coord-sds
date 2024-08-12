import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../material/custom-material.module';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { ClassUnit } from '../../../features/interface/ClassUnit';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-file',
  standalone: true,
  imports: [MaterialModule, SafeUrlPipe],
  templateUrl: './preview-file.component.html',
  styleUrl: './preview-file.component.css'
})
export class PreviewFileComponent {

  readonly data = inject<ClassUnit>(MAT_DIALOG_DATA);

  @Input() fileURL:string = '';

  constructor() {
    if(this.data){
      this.fileURL = this.data.class_unit_file_url;
    }
  }
}
