import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  currentYear = new Date().getFullYear()

  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate(['/' + path]);
  }

}



