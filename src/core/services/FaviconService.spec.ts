import { describe, it, expect, beforeEach } from 'vitest';
import { FaviconService } from './FaviconService';

describe('FaviconService', () => {
  beforeEach(() => {
    document.head.innerHTML = ''; // Limpa o head antes de cada teste
  });

  it('deve criar uma tag link de favicon se ela não existir', () => {
    FaviconService.updateWithColor('#ff0000');
    
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link).toBeTruthy();
    expect(link.href).toContain('data:image/svg+xml');
    expect(link.href).toContain('%23ff0000'); // # codificado
  });

  it('deve atualizar o href da tag link existente', () => {
    // Cria um link prévio
    const existing = document.createElement('link');
    existing.rel = 'icon';
    existing.href = 'old-path.png';
    document.head.appendChild(existing);

    FaviconService.updateWithColor('#00ff00');
    
    expect(existing.href).toContain('%2300ff00');
    expect(document.querySelectorAll("link[rel*='icon']").length).toBe(1);
  });
});