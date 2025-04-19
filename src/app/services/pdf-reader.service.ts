import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PdfReaderService {
    
    constructor() { }
    
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
        .map(t => t.replace(/^\(|\)$/g, '')) // usuwamy nawiasy
        .join(' ')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')');
    }
    
}
