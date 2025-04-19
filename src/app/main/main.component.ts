import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { PromptAnalyzerService } from '../services/prompt-analyzer.service';
import {PdfReaderService} from '../services/pdf-reader.service';
import {PdfReportService} from '../services/pdf-report.service';



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
export class MainComponent implements OnInit{
    
    @ViewChild('fileUpload') fileInputRef!: ElementRef<HTMLInputElement>;
    
    
    public fileName;
    public analysisResult;
    public requiredFileType = 'application/pdf';
    public uploadProgress;
    public selectedFile: File | null;
    public canSelectNewFile: boolean;
    public analysisText: string;
    public fullReport: string;
    public metadata: string[];
    public antiAiReport: string;
    
    
    
    constructor(private promptAnalyzer: PromptAnalyzerService,
                private pdfReader: PdfReaderService,
                private reportService: PdfReportService) {}
    
    ngOnInit(): void {
        this.setDefaultValues();
    }
    
    
    public setDefaultValues() {
        this.fileName = '';
        this.analysisResult = '';
        this.uploadProgress = 0;
        this.selectedFile = null;
        this.canSelectNewFile = true;
        this.analysisText = '';
        this.fullReport = '';
        this.metadata = [];
    
    
    
        if (this.fileInputRef) {
            this.fileInputRef.nativeElement.value = '';
        }
    }
    
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.canSelectNewFile = false;
            this.selectedFile = input.files[0];
            this.fileName = this.selectedFile.name;
            this.uploadProgress = 0;
            this.analysisResult = '';
        }
    }
    
    cancelUpload() {
        this.setDefaultValues();
    }
    
    async analyzeFile() {
        this.canSelectNewFile = false;
        this.uploadProgress = 10;
        setTimeout(() => {this.uploadProgress = 30}, 1000);
        setTimeout(() => {this.uploadProgress = 60}, 2000);
        setTimeout(() => {this.uploadProgress = 90}, 2500);
        setTimeout(() => {this.uploadProgress = 100}, 3000);
        
        const text = await this.pdfReader.extractTextFromFile(this.selectedFile);
        this.analysisText = text;
        const results = this.promptAnalyzer.fullAnalysis(text);
    
        setTimeout(() => {
            this.analysisResult = results.join('\n');
            this.canSelectNewFile = true;
        }, 3500);
        
    }
    
    async showFullReport() {
        if (!this.analysisText) return;
    
        this.antiAiReport = this.promptAnalyzer.generateAntiAiReport(this.analysisText);
        this.metadata = await this.pdfReader.extractRawMetadata(this.selectedFile);
        
        this.fullReport = this.reportService.generateReport(this.analysisText, this.metadata, this.antiAiReport);
    }

}
