import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
export class GeneradorQrComponent implements AfterViewInit {
  qrData: string = '';
  qrCodeUrl: SafeUrl | null = null;
  elementType: QRCodeElementType = 'svg';
  qrGenerated: boolean = false;

  @ViewChild('qrCodeElement', { static: false }) qrCodeElement!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    this.applyGradientToQR();
  }

  onQRCodeURL(url: SafeUrl) {
    this.qrCodeUrl = url;
  }

  generateQRCode() {
    if (!this.qrData || this.qrData.trim() === '') {
      this.qrData = 'by JH.Dev';
    } else {
      this.qrData = this.qrData.trim();
    }
    this.qrGenerated = true;
    setTimeout(() => this.applyGradientToQR(), 0); // Aseguramos que el SVG esté renderizado
  }

  private applyGradientToQR() {
    if (!this.qrCodeElement || !this.qrCodeElement.nativeElement) {
      return;
    }

    const svgElement = this.qrCodeElement.nativeElement.querySelector('svg');
    if (!svgElement) {
      return;
    }

    // Crear el elemento <defs> si no existe
    let defs = svgElement.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      svgElement.prepend(defs);
    }

    // Crear el degradado
    const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    linearGradient.setAttribute('id', 'qr-gradient');
    linearGradient.setAttribute('x1', '0%');
    linearGradient.setAttribute('y1', '0%');
    linearGradient.setAttribute('x2', '100%');
    linearGradient.setAttribute('y2', '100%');

    // Definir los colores del degradado
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#1111a2');
    stop1.setAttribute('stop-opacity', '1');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#3f51b5');
    stop2.setAttribute('stop-opacity', '1');

    linearGradient.appendChild(stop1);
    linearGradient.appendChild(stop2);
    defs.appendChild(linearGradient);

    // Asegurarnos de que los rectángulos oscuros usen el degradado
    const rects = svgElement.querySelectorAll('rect[fill]');
    rects.forEach((rect: SVGRectElement) => {
      if (rect.getAttribute('fill') !== '#ffffff') {
        rect.setAttribute('fill', 'url(#qr-gradient)');
      }
    });
  }
}