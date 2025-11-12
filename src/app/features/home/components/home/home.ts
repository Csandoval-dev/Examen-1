import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  
  nombreCompleto: string = 'Carlos Leonel Sandoval Cerrato';
  numeroCuenta: string = '62111743';
}