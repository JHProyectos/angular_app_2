import { Component } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  imports: [BackButtonComponent],
  templateUrl: './clases.component.html',
  styleUrl: '../gh-pages/gh-pages.component.css'
})

export class ClasesComponent {

   constructor(private router: Router) {
    
  }  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
