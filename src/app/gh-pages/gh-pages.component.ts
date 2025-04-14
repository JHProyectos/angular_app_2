import { Component } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';

@Component({
  selector: 'app-gh-pages',
  imports: [BackButtonComponent],
  templateUrl: './gh-pages.component.html',
  styleUrl: './gh-pages.component.css'
})
export class GhPagesComponent {
  currentYear = new Date().getFullYear()

}
