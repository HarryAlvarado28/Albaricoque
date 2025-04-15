import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class CompassComponent {
  angle: number = 0;
  degrees: number[] = [];

  constructor() {
    // Mostrar etiquetas cada 30 grados
    for (let i = 0; i < 360; i += 30) {
      this.degrees.push(i);
    }
  }
}
