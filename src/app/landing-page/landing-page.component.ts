import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-landing-page',
  imports: [],
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



