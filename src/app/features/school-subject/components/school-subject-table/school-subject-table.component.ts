import { Component } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  document: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', document:'Ciencias Sociales', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', document:'Ciencia y tecnologia', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', document:'Educación física', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', document:'Educación Religiosa', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', document:'518598555', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', document:'518598555', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', document:'518598555', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', document:'518598555', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', document:'518598555', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', document:'518598555', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-school-subject-table',
  standalone: true,
  imports: [MaterialModule, NgIconComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './school-subject-table.component.html',
  styleUrl: './school-subject-table.component.css'
})
export class SchoolSubjectTableComponent {

  displayedColumns: string[] = ['position', 'area', 'action'];
  dataSource = ELEMENT_DATA;

}
