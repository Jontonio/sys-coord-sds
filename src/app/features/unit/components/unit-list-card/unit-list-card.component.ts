import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unit } from '../../../interface/Unit';
import { MaterialModule } from '../../../../material/custom-material.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { iconsList } from '../../../../shared/icons/icons';

@Component({
  selector: 'app-unit-list-card',
  standalone: true,
  imports: [MaterialModule, NgIconComponent],
    providers: [provideIcons({ ...iconsList})],
  templateUrl: './unit-list-card.component.html',
  styleUrl: './unit-list-card.component.css'
})
export class UnitListCardComponent {

  @Input() units:Unit[] = [];
  @Output() handleUpdate = new EventEmitter<Unit>();
  @Output() handleDelete = new EventEmitter<Unit>();

  selectedUpdate(unit:Unit){
    this.handleUpdate.emit(unit);
  }

  selectedDelete(unit:Unit){
    this.handleDelete.emit(unit);
  }

}
