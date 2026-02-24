import { describe, it, expect } from 'vitest';
import { ServiceWorkerGenerator } from './ServiceWorkerGenerator';

describe('ServiceWorkerGenerator', () => {
  it('deve gerar o nome da cache formatado corretamente', () => {
    const sw = ServiceWorkerGenerator.generate('Meu App', './');
    
    // 'Meu App' deve virar 'meu-app-v1' para ser seguro em URLs/Caches
    expect(sw).toContain("const CACHE_NAME = 'meu-app-v1';");
  });

  it('deve incluir a proteção contra protocolos não-HTTP', () => {
    const sw = ServiceWorkerGenerator.generate('Teste', './');
    
    expect(sw).toContain("if (!event.request.url.startsWith('http')) return;");
  });

  it('deve incluir os extraAssets no array ASSETS_TO_CACHE', () => {
    const extraAssets = ['icons/icon-192.png', 'screenshots/screen-1.png'];
    const sw = ServiceWorkerGenerator.generate('Teste', './', extraAssets);
    
    expect(sw).toContain('./icons/icon-192.png');
    expect(sw).toContain('./screenshots/screen-1.png');
  });

  it('deve clonar a resposta da rede antes de colocar no cache', () => {
    const sw = ServiceWorkerGenerator.generate('Teste', './');
    
    expect(sw).toContain('const responseToCache = networkResponse.clone();');
    expect(sw).toContain('cache.put(event.request, responseToCache);');
  });
});