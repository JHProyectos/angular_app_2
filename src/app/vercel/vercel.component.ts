import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonComponent } from "../back-button/back-button.component";

@Component({
  selector: 'app-vercel',
  imports: [BackButtonComponent],
  templateUrl: './vercel.component.html',
  styleUrl: './vercel.component.css'
})
export class VercelComponent {
  currentYear = new Date().getFullYear()

  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate(['/' + path]);
  }
}
