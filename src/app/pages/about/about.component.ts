import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatCardModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  
  text: string = `
  Niniejsza aplikacja służy do analizy plików PDF pod kątem potencjalnych oszustw związanych z wykorzystaniem sztucznej inteligencji, takich jak ukryte prompt'y, ataki hakerskie oraz manipulacyjne wiadomości.
  <br><br>
  Aby skorzystać z programu:
  <ul>
    <li>Załaduj plik PDF zawierający CV lub inny dokument tekstowy,</li>
    <li>Wykonaj analizę klikając odpowiedni przycisk,</li>
    <li>Odczytaj wynik oraz raporty: językowy i bezpieczeństwa.</li>
  </ul>
`;
}
