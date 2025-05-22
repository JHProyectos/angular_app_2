import { Component, AfterViewInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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
    CommonModule,
  ],
  templateUrl: './generador-qr.component.html',
  styleUrls: ['./generador-qr.component.css']
})
export class GeneradorQrComponent implements AfterViewInit {
  qrData: string = '';
  qrCodeUrl: SafeUrl | null = null;
  elementType: QRCodeElementType = 'canvas'; // Cambiado a 'canvas'
  qrGenerated: boolean = false;
  inputText: string = '';

  @ViewChild('qrCodeElement', { static: false }) qrCodeComponent!: QRCodeComponent;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() { }

  onQRCodeURL(url: SafeUrl) {
    this.qrCodeUrl = url;
    this.cdr.detectChanges();
    console.log('URL generada para descarga:', url);
  }

  generateQRCode() {
    if (!this.inputText || this.inputText.trim() === '') {
      this.qrData = 'by JH.Dev';
    } else {
      this.qrData = this.inputText.trim();
    }
    this.qrGenerated = true;
    this.qrCodeUrl = null; // Reiniciamos la URL antes de generar
    this.cdr.detectChanges();
  }

  resetQR() {
    this.qrGenerated = false;
    this.qrData = '';
    this.qrCodeUrl = null;
    this.inputText = '';
    this.cdr.detectChanges();
  }
}