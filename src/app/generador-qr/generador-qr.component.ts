import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeComponent, QRCodeElementType } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generador-qr',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeComponent,
    CommonModule
  ],
  templateUrl: './generador-qr.component.html',
  styleUrls: ['./generador-qr.component.css']
})
export class GeneradorQrComponent {
  qrData: string = '';
  qrCodeUrl: SafeUrl | null = null;
  elementType: QRCodeElementType = 'canvas';

  onQRCodeURL(url: SafeUrl) {
    this.qrCodeUrl = url;
  }

  generateQRCode() {
    if (!this.qrData) {
      return;
    }
    // La generación se maneja automáticamente por el componente <qrcode>
  }
}