import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PromptAnalyzerService {
  
  constructor() { }
  
  detectPrompts(text: string): string {
    const promptKeywords = [
      'GPT', 'ChatGPT', 'AI prompt', 'system:', 'user:', 'assistant:', 'prompt:', 'model:'
    ];
    
    const found = promptKeywords.filter(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    return found.length > 0
        ? `Znaleziono potencjalne prompty: ${found.join(', ')}`
        : 'Brak oczywistych promptów w treści.';
  }
}
