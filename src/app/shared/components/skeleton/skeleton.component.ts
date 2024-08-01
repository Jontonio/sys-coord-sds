import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports:[CommonModule],
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css']
})
export class SkeletonComponent {

  @Input() width:string = '100%';
  @Input() height:string = '20px';
  @Input() borderRadius:string = '5px';

  constructor() { }

}
