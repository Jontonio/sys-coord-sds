import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material/custom-material.module';
import { ClassUnitTreeComponent } from "../class-unit-tree/class-unit-tree.component";
import { RomanNumberPipe } from '../../../../shared/pipes/roman-number.pipe';
import { CacheService } from '../../../../core/services/cache.service';
import { DbService } from '../../../../core/services/db.service';
import { AcademicProgram } from '../../../interface/AcademicProgram';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { UnitItemTreeComponent } from "../unit-item-tree/unit-item-tree.component";

@Component({
  selector: 'app-class-unit-list',
  standalone: true,
  imports: [MaterialModule, ClassUnitTreeComponent, RomanNumberPipe, SkeletonComponent, ShowEmptyMessageComponent, UnitItemTreeComponent],
  templateUrl: './class-unit-list.component.html',
  styleUrl: './class-unit-list.component.css'
})
export class ClassUnitListComponent {

  dbService = inject(DbService);
  cacheService = inject(CacheService);
  loadingService = inject(LoaddingService);
  selectedIndex: number = 0;

  programamAcademics:AcademicProgram[] = [];

  constructor() {

    this.programamAcademics = this.cacheService.cacheAcademicProgram.academicProgram;

    if(this.cacheService.getCodeModularUser()){
      const data = {
        modular_code: this.cacheService.getCodeModularUser()
      }
      this.getProgramAcademics(data);
    }
  }

  ngOnInit(): void {
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedIndex = event.index;
  }

  getProgramAcademics({ modular_code }:any){
    this.dbService.getAcademicProgramsFromIE({modular_code}).subscribe({
      next:({ data }) => {
        this.programamAcademics = data.data;
      },
    })
  }

}
