import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { GhPagesComponent } from './gh-pages/gh-pages.component';
import { VercelComponent } from './vercel/vercel.component';
import { ClasesComponent } from './clases/clases.component';
import {ClasesApiComponent} from './clases-api/clases-api.component';
import { GeneradorQrComponent } from './generador-qr/generador-qr.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'gh-pages', component: GhPagesComponent },
  { path: 'vercel', component: VercelComponent },
  {path: 'clases', component: ClasesComponent},
  {path: 'clases-api', component: ClasesApiComponent},
  {path: 'generador-qr', component: GeneradorQrComponent},
  { path: '**', redirectTo: '' }
];