import { Component, inject } from '@angular/core';
import { RomanNumberPipe } from '../../../../shared/pipes/roman-number.pipe';
import { DbService } from '../../../../core/services/db.service';
import { CacheService } from '../../../../core/services/cache.service';
import { AcademicProgram } from '../../../interface/AcademicProgram';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { ShowEmptyMessageComponent } from '../../../../shared/components/show-empty-message/show-empty-message.component';
import { LoaddingService } from '../../../../core/services/loadding.service';
import { MaterialModule } from '../../../../material/custom-material.module';

@Component({
  selector: 'app-time-line',
  standalone: true,
  imports: [RomanNumberPipe, SkeletonComponent,MaterialModule, ShowEmptyMessageComponent],
  templateUrl: './time-line.component.html',
  styleUrl: './time-line.component.css'
})
export class TimeLineComponent {

  dbService = inject(DbService);
  cacheService = inject(CacheService);
  loadingService = inject(LoaddingService);

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

  getProgramAcademics({ modular_code }:any){
    this.dbService.getAcademicProgramsFromIE({modular_code}).subscribe({
      next:({ data }) => {
        this.programamAcademics = data.data;
      },
    })
  }
}
