import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../../material/custom-material.module';

@Component({
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export default class DashboardHomeComponent {

}
