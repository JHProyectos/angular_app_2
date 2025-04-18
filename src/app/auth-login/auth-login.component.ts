import { Component, Optional, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css'
})
export class AuthLoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  user: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Optional() private dialogRef: MatDialogRef<AuthLoginComponent>,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    (window as any).handleCredentialResponse = (response: any) => {
      this.http.post('http://localhost:3000/auth/google', { idToken: response.credential })
        .subscribe({
          next: (response: any) => {
            console.log('Usuario autenticado con Google:', response);
            this.authService.setUser(response.user, response.token);
            this.dialogRef?.close();
            this.router.navigateByUrl('/', { replaceUrl: true });
          },
          error: (error) => {
            console.error('Error al autenticar con Google:', error);
          }
        });
    };
  }

  ngAfterViewInit() {
    console.log('Inicializando botón de Google');
    const google = (window as any).google;
    if (google) {
      console.log('Google API disponible');
      google.accounts.id.initialize({
        client_id: '902395675237-uo029rp0od1ramc8bsmt3eb76kkeb4md.apps.googleusercontent.com',
        callback: (window as any).handleCredentialResponse,
        auto_select: false
      });
      const buttonDiv = document.querySelector('.google-login-btn');
      console.log('Button div:', buttonDiv);
      if (buttonDiv) {
        google.accounts.id.renderButton(buttonDiv, {
          type: 'standard',
          size: 'large',
          theme: 'outline',
          text: 'sign_in_with',
          shape: 'rectangular',
          logo_alignment: 'left'
        });
        console.log('Botón de Google renderizado');
      } else {
        console.error('No se encontró .google-login-btn');
      }
    } else {
      console.error('Google API no disponible');
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/auth/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Login exitoso:', response);
            this.authService.setUser(response.user, response.token);
            this.dialogRef?.close();
            this.router.navigateByUrl('/', { replaceUrl: true });
          },
          error: (error) => {
            console.error('Error en el login:', error);
            alert('Credenciales incorrectas');
          }
        });
    }
  }

  signOut(): void {
    this.authService.clearUser();
    this.dialogRef?.close();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}