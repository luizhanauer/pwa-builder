import { describe, it, expect } from 'vitest';
import { HtmlGeneratorService } from './HtmlGeneratorService';
import type { PwaManifest } from '../../composables/useManifest';

describe('HtmlGeneratorService', () => {
  const mockManifest: PwaManifest = {
    name: 'App de Teste',
    short_name: 'Teste',
    description: 'Uma descrição de teste',
    start_url: './',
    scope: './app/',
    display: 'standalone',
    background_color: '#123456',
    theme_color: '#654321',
    icons: [],
    screenshots: []
  };

  it('deve gerar o HTML contendo a tag <main> semântica para SEO', () => {
    const html = HtmlGeneratorService.generate(mockManifest);
    
    expect(html).toContain('<main>');
    expect(html).toContain('</main>');
    expect(html).toContain('<h1>Teste</h1>'); // short_name
  });

  it('deve injetar a cor de fundo correta no CSS inline', () => {
    const html = HtmlGeneratorService.generate(mockManifest);
    
    expect(html).toContain('background-color: #123456;');
  });

  it('deve registrar o Service Worker usando o scope definido no manifesto', () => {
    const html = HtmlGeneratorService.generate(mockManifest);
    
    expect(html).toContain(`navigator.serviceWorker.register('./sw.js', { scope: './app/' })`);
  });
});