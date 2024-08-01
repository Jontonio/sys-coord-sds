import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material/custom-material.module';

@Component({
  selector: 'app-show-empty-message',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './show-empty-message.component.html',
  styleUrl: './show-empty-message.component.css'
})
export class ShowEmptyMessageComponent {
  @Input() msg:string = 'No se encontraron elementos registrados'
}
