import { Component } from "@angular/core"
import { Router } from "@angular/router";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: "app-root",
  template: `
  <app-back-button
      *ngIf="!isLandingPage"
      @fadeInOut
    ></app-back-button>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
   animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // cuando aparece
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('700ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [ // cuando desaparece
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ],
  styles: [  ],
  standalone: false,
})
export class AppComponent {
  title = "angular-github-pages"

  isLandingPage = false;

  constructor(private router: Router) {
    // Verificamos la ruta actual al iniciar
    this.router.events.subscribe(() => {
      this.isLandingPage = this.router.url === '/' || this.router.url === '/home';
    });
  }
}


