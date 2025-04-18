import { Router } from "@angular/router";
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoginButtonComponent } from './login-button/login-button.component';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { BackButtonComponent } from "./back-button/back-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    LoginButtonComponent,
    BackButtonComponent
],
  template: `
  <app-back-button
      *ngIf="!isLandingPage"
      @fadeInOut
    ></app-back-button>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <div class="app-container">
  <app-login-button *ngIf="!user"></app-login-button>
  <div class="user-info" *ngIf="user">
    <span>Bienvenido, {{ user.name || user.email || 'Usuario' }}!</span>
    <button mat-button color="warn" (click)="logout()">Cerrar sesión</button>
  </div>
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
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy {
  user: any = null;
  private userSubscription: Subscription;
  title = "angular-github-pages"

  isLandingPage = false;

  constructor(private router: Router, private authService: AuthService) {
    // Verificamos la ruta actual al iniciar
    this.router.events.subscribe(() => {
      this.isLandingPage = this.router.url === '/' || this.router.url === '/home';
    });
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.clearUser();
  }
}




