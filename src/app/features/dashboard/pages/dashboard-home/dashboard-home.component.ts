import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material/custom-material.module';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export default class DashboardHomeComponent {

  titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('SIRAUN | Dashboard');
  }
}
