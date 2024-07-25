import { Component } from '@angular/core';
import { ClassUnitListComponent } from "../../components/class-unit-list/class-unit-list.component";

@Component({
  selector: 'app-class-unit-home',
  standalone: true,
  imports: [ClassUnitListComponent],
  templateUrl: './class-unit-home.component.html',
  styleUrl: './class-unit-home.component.css'
})
export default class ClassUnitHomeComponent {

}
