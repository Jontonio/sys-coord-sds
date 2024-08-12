import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-institution-home',
  standalone: true,
  imports: [],
  templateUrl: './institution-home.component.html',
  styleUrl: './institution-home.component.css'
})
export default class InstitutionHomeComponent {

  titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('SIRAUN | Instituciones');
  }

}
