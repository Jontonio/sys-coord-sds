import { Component } from '@angular/core';
import { RomanNumberPipe } from '../../../../shared/pipes/roman-number.pipe';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [RomanNumberPipe],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {

  items:number[] = [1,2,3,4,5];

}
