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
}
