import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompassComponent } from "./compass/compass.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CompassComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'albaricoque';
}
