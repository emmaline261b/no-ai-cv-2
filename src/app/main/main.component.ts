import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { PromptAnalyzerService } from '../services/prompt-analyzer.service';

@Component({
    selector: 'app-main',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatCardModule,
        MatIcon
    ],
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent {
    fileName = '';
    requiredFileType = 'application/pdf';
    uploadProgress = 0;
    
    constructor(private promptAnalyzer: PromptAnalyzerService) {}
    
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            const file = input.files[0];
            this.fileName = file.name;
            this.uploadProgress = 100;
            
            // Przykład: Można tu analizować plik, np. wyciągać tekst i przekazać do serwisu
            // this.promptAnalyzer.detectPrompts(...)
        }
    }
    
    cancelUpload(): void {
        this.fileName = '';
        this.uploadProgress = 0;
    }
    
    analyzeFile() {
        console.log('analyzing the file...');
    }
}
