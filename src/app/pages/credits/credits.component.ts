import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  
  text: string = `
  Niniejszy projekt został przygotowany przez Małgorzatę Lasotę oraz Justynę Pustelnik w ramach zajęć prowadzonych na Uczelni WSB Merito w roku 2025.
  <br><br>
  <strong>Zastrzeżenie:</strong><br>
  W ramach pracy nad niniejszym projektem autorki korzystały z narzędzi opartych na sztucznej inteligencji (w tym ChatGPT), dokumentacji dostępnej publicznie, platformy stackoverflow.com, github.com oraz innych źródeł edukacyjnych i społecznościowych.
`;
}
