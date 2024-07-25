import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ClassUnitTreeComponent } from "../class-unit-tree/class-unit-tree.component";

@Component({
  selector: 'app-class-unit-list',
  standalone: true,
  imports: [MaterialModule, ClassUnitTreeComponent],
  templateUrl: './class-unit-list.component.html',
  styleUrl: './class-unit-list.component.css'
})
export class ClassUnitListComponent {

}
