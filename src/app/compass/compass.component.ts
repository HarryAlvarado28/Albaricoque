import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompassService } from './compass.service';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrl: './compass.component.scss',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CompassComponent {
  angle: number = 0;
  degrees: number[] = [];

  constructor(private readonly compassService: CompassService) {
    for (let i = 0; i < 360; i += 30) {
      this.degrees.push(i);
    }
  }

  rotate(direction: 'L' | 'R') {
    // Determina cuántos grados se suma o resta
    const step = direction === 'R' ? 15 : -15;
    this.angle = (this.angle + step + 360) % 360;
    console.log('Ángulo actual:', this.angle);
    
    // Llama al servicio con el comando correspondiente
    this.compassService.enviarComando(direction).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
  
        //const regex = /Ángulo actual:\s*(\d+)/;
        //const match = response.respuesta.match(regex);
        //if (match) {
        //  this.angle = Number(match[1]);
        //}
        //console.log('Ángulo actual enviarComando:', this.angle);
      },
      error: (err) => {
        console.error('Error al enviar comando', err);
      }
    });
  }
  
}
