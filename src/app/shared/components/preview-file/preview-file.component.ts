import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/custom-material.module';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-preview-file',
  standalone: true,
  imports: [MaterialModule, SafeUrlPipe],
  templateUrl: './preview-file.component.html',
  styleUrl: './preview-file.component.css'
})
export class PreviewFileComponent {

  @Input() fileURL:string = 'https://www2.congreso.gob.pe/sicr/cendocbib/con2_uibd.nsf/9AF0DD37C68D813B05257791006F5850/$FILE/Bio_Jos%C3%A9_Mar%C3%ADa_Arguedas.pdf';

}
