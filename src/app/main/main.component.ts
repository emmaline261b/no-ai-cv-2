import {Component} from '@angular/core';
import {FileUploadModule, FileUploadEvent} from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import {MessageService} from 'primeng/api';
import {CommonModule} from '@angular/common';
import {BadgeModule} from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import {HttpClientModule} from '@angular/common/http';
import {PrimeNG} from 'primeng/config';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}


@Component({
    selector: 'app-main',
    standalone: true,
    imports: [FileUploadModule, ButtonModule, BadgeModule, ToastModule, HttpClientModule, CommonModule, ProgressBarModule],
    providers: [MessageService],
    templateUrl: './main.component.html',
    styleUrl: './main.component.css'
})
export class MainComponent {
    
    constructor(private config: PrimeNG, private messageService: MessageService) {}
    
    files: File[] = [];
    
    totalSize : number = 0;
    
    totalSizePercent : number = 0;
    
    onUpload(event: UploadEvent) {
        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }
    
    choose(event, callback) {
        callback();
    }
    
    onRemoveTemplatingFile(event, file, removeFileCallback, index) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / 10;
    }
    
    onClearTemplatingUpload(clear: () => void) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }
    
    onTemplatedUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
    
    onSelectedFiles(event: { currentFiles: File[] }) {
        this.files = event.currentFiles;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / 10;
    }
    
    uploadEvent(callback: () => void) {
        callback();
    }
    
    
    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config?.translation?.fileSizeTypes ?? ['B', 'KB', 'MB', 'GB', 'TB'];
    
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        
        return `${formattedSize} ${sizes[i]}`;
    }
}
