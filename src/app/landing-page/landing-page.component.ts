import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{

  constructor(private router: Router) {
    
  }  
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
 
    currentYear = new Date().getFullYear()
}

