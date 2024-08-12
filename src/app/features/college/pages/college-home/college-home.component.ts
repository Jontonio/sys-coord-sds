import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-college-home',
  standalone: true,
  imports: [],
  templateUrl: './college-home.component.html',
  styleUrl: './college-home.component.css'
})
export default class CollegeHomeComponent {

  titleService = inject(Title);

  constructor(){
    this.titleService.setTitle('SIRAUN - Docentes');
  }

}
