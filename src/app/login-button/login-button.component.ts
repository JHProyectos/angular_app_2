import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthLoginComponent } from '../auth-login/auth-login.component';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {
  constructor(private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(AuthLoginComponent, {
      width: '400px',
      disableClose: false
    });
  }
}