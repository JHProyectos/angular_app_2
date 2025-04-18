import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GhPagesComponent } from './gh-pages/gh-pages.component';
import { VercelComponent } from './vercel/vercel.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'gh-pages', component: GhPagesComponent },
  { path: 'vercel', component: VercelComponent },
  { path: '**', redirectTo: '' }
];