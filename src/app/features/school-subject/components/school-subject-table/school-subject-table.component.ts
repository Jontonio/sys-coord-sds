import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { iconsList } from '../../../../shared/icons/icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Area } from '../../../interface/Area';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';


const ELEMENT_DATA: Area[] = [];

@Component({
  selector: 'app-school-subject-table',
  standalone: true,
  imports: [MaterialModule, NgIconComponent, SkeletonComponent, ShowEmptyMessageComponent],
  providers: [provideIcons({ ...iconsList, heroUsers })],
  templateUrl: './school-subject-table.component.html',
  styleUrl: './school-subject-table.component.css'
})
export class SchoolSubjectTableComponent {

  displayedColumns: string[] = ['id', 'area_name', 'action'];
  @Input() dataSource = ELEMENT_DATA;
  loadingService = inject(LoaddingService);
}
