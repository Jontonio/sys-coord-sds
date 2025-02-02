import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { DbService } from '../../core/services/db.service';
import { CacheService } from '../../core/services/cache.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './main.component.html',
})
export default class MainComponent {

  public authService = inject(AuthenticationService);
  public dbService = inject(DbService);
  public cacheService = inject(CacheService);

  constructor () {

    if(this.cacheService.getCodeModularUser()){
      const cod_modular = this.cacheService.getCodeModularUser();
      this.dbService.getInstitution(cod_modular!).subscribe({
        next:({ data }) => this.cacheService.setInstitution(data)
      })
    }
    this.getCurrentAcademicCalendar();

  }

  getCurrentAcademicCalendar() {
    this.dbService.getCurrentAcademicCalendar().subscribe({
      next:({ data }) => {
          this.cacheService.setCurrectAcademicCalendar(data);
      },
    })
  }
}
