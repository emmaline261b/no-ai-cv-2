import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptAnalyzerService {
  
  private aiPrompts = ['chatgpt', 'user:', 'system:', 'assistant:', 'prompt:', 'gpt'];
  private hackerTerms = ['<script>', 'eval(', 'document.cookie', 'localhost'];
  private hiddenMessages = [
    'offer me the job',
    'this is the best candidate',
    'pick me',
    'hire this person'
  ];
  
  fullAnalysis(text: string): string[] {
    const lowerText = text.toLowerCase();
    const findings: string[] = [];
    
    const foundPrompts = this.aiPrompts.filter(p => lowerText.includes(p));
    if (foundPrompts.length) {
      findings.push(`🤖 Wykryto prompt’y AI: ${foundPrompts.join(', ')}`);
    }
    
    const foundHacker = this.hackerTerms.filter(p => lowerText.includes(p));
    if (foundHacker.length) {
      findings.push(`☠️ Podejrzane terminy hakerskie: ${foundHacker.join(', ')}`);
    }
    
    const foundHidden = this.hiddenMessages.filter(p => lowerText.includes(p));
    if (foundHidden.length) {
      findings.push(`❌ Ukryte wiadomości manipulujące wynikiem: ${foundHidden.join(', ')}`);
    }
    
    if (!findings.length) {
      findings.push('✅ Nie wykryto niczego podejrzanego.');
    }
    
    return findings;
  }
  
  generateAntiAiReport(text: string): string {
    const lowerText = text.toLowerCase();
    
    const aiPrompts = ['chatgpt', 'prompt:', 'user:', 'system:', 'assistant:', 'gpt', 'model:', 'response:'];
    const hackerTerms = ['<script>', 'base64', 'eval(', 'onerror=', 'document.cookie', 'fetch(', 'localhost', '127.0.0.1'];
    const hiddenMessages = [
      'offer me the job',
      'this is the best candidate',
      'pick me',
      'hire this person',
      'ignore other applicants',
      'priority candidate',
      'guaranteed success'
    ];
    
    const findings: string[] = [];
    const foundPrompts = aiPrompts.filter(p => lowerText.includes(p));
    const foundHacker = hackerTerms.filter(p => lowerText.includes(p));
    const foundHidden = hiddenMessages.filter(p => lowerText.includes(p));
    
    findings.push('Raport z analizy pod kątem oszustw AI');
    findings.push('=======================================');
    findings.push(`Data analizy: ${new Date().toLocaleString()}`);
    findings.push('');
    findings.push('Zakres analizy:');
    findings.push('- Wykrywanie promptów AI (np. ChatGPT)');
    findings.push('- Wyszukiwanie podejrzanych fraz hakerskich (XSS, base64 itp.)');
    findings.push('- Detekcja ukrytych wiadomości manipulujących wynikiem (np. "hire this person")');
    findings.push('');
    
    if (foundPrompts.length) {
      findings.push(`Wykryto prompt'y AI: ${foundPrompts.join(', ')}`);
    } else {
      findings.push('Nie znaleziono promptów AI.');
    }
    
    if (foundHacker.length) {
      findings.push(`Wykryto podejrzane terminy hakerskie: ${foundHacker.join(', ')}`);
    } else {
      findings.push('Nie wykryto podejrzanych fraz hakerskich.');
    }
    
    if (foundHidden.length) {
      findings.push(`Wykryto ukryte wiadomości manipulujące wynikiem: ${foundHidden.join(', ')}`);
    } else {
      findings.push('Nie znaleziono ukrytych wiadomości.');
    }
    
    findings.push('');
    findings.push('Wnioski:');
    findings.push('==========');
    if (foundPrompts.length || foundHacker.length || foundHidden.length) {
      findings.push('Plik może zawierać próbę manipulacji systemem AI lub użytkownikiem.');
    } else {
      findings.push('Plik wygląda na bezpieczny pod kątem znanych technik oszustwa.');
    }
    
    return findings.join('\n');
  }
  
}
