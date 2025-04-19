import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfReportService {
    generateReport(text: string, metadata: string[] = []): string {
        const stats = this.getTextStats(text);
        const typeInfo = this.getDocumentTypeInfo(text);
        
        return [
            'Raport z analizy pliku PDF',
            '==============================',
            `Data analizy: ${new Date().toLocaleString()}`,
            '',
            ...metadata.map(m => `Metadane: ${m}`),
            '',
            typeInfo,
            '',
            'Statystyki:',
            `- Liczba słów: ${stats.wordCount}`,
            `- Liczba linijek: ${stats.lineCount}`,
            '',
            'Top 5 najczęściej występujących słów:',
            ...stats.topWords.map(([word, count]) => `  • ${word}: ${count}x`),
            ''
        ].join('\n');
    }
    
    getTextStats(text: string) {
        const words = text.trim().split(/\s+/);
        const wordCount = words.length;
        const lineCount = text.split(/\r?\n/).length;
        
        const freqMap = new Map<string, number>();
        for (const word of words) {
            const clean = word.toLowerCase().replace(/[^a-ząćęłńóśźż]/gi, '');
            if (!clean || clean.length < 3) continue;
            freqMap.set(clean, (freqMap.get(clean) || 0) + 1);
        }
        
        const topWords = [...freqMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
        
        return {
            wordCount,
            lineCount,
            topWords
        };
    }
    
    getDocumentTypeInfo(text: string): string {
        const lowerText = text.toLowerCase();
        const cvKeywords = [
            'curriculum vitae',
            'cv',
            'życiorys',
            'doświadczenie zawodowe',
            'wykształcenie',
            'umiejętności',
            'kompetencje',
            'języki obce',
            'zainteresowania',
            'kontakt',
            'data urodzenia',
            'adres',
            'linkedin',
            'profil zawodowy',
            'podsumowanie',
            'cel zawodowy'
        ];
        const found = cvKeywords.filter(k => lowerText.includes(k));
        
        if (found.length >= 2) {
            return `Typ pliku: prawdopodobnie CV\nSłowa kluczowe: ${found.join(', ')}`;
        }
        if (found.length === 1) {
            return `Typ pliku: możliwe CV\nSłowo kluczowe: ${found[0]}`;
        }
        return `Typ pliku: nieznany`;
    }
    
}
