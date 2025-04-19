import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfReaderService {
    async extractTextFromFile(file: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                const raw = reader.result as string;
                const decoded = this.decodeTextFromPDFRaw(raw);
                resolve(decoded);
            };
            
            reader.onerror = () => {
                reject('Błąd podczas wczytywania pliku.');
            };
            
            reader.readAsText(file);
        });
    }
    
    private decodeTextFromPDFRaw(data: string): string {
        const textMatches = data.match(/(?:\()([^\)]+)(?:\))/g);
        if (!textMatches) return 'Brak tekstu do analizy';
        
        return textMatches
        .map(t => t.replace(/^\(|\)$/g, ''))
        .join(' ')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')');
    }
    
    async extractRawMetadata(file: File): Promise<string[]> {
        const buffer = await file.arrayBuffer();
        const text = new TextDecoder().decode(buffer);
        
        const meta: string[] = [];
        
        const match = (label: string, name: string) => {
            const regex = new RegExp(`/${label}\\s*\\(([^\\)]+)\\)`);
            const found = text.match(regex);
            if (found) meta.push(`${name}: ${found[1]}`);
        };
        
        match('Title', 'Tytuł');
        match('Author', 'Autor');
        match('Creator', 'Utworzono przez');
        
        const dateRaw = text.match(/\/CreationDate\s*\(([^)]+)\)/);
        if (dateRaw) {
            meta.push(`Data utworzenia: ${this.formatPdfDate(dateRaw[1])}`);
        }
        
        const modDateRaw = text.match(/\/ModDate\s*\(([^)]+)\)/);
        if (modDateRaw) {
            meta.push(`Ostatnia modyfikacja: ${this.formatPdfDate(modDateRaw[1])}`);
        }
        
        return meta.length ? meta : ['❌ Nie znaleziono metadanych w pliku PDF.'];
    }
    
    private formatPdfDate(raw: string): string {
        const match = raw.match(/^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
        if (!match) return raw;
        
        const [_, year, month, day, hour, minute, second] = match;
        const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
        return date.toLocaleString();
    }
}
