import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ZipExportService } from './ZipExportService';
import type { PwaManifest } from '../../composables/useManifest';

describe('ZipExportService', () => {
  const mockManifest: PwaManifest = {
    name: 'App de Teste',
    short_name: 'Teste',
    description: 'Descrição de teste',
    start_url: './',
    scope: './',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      // Imagem base64 válida para não invocar o Canvas no teste de ZIP
      { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', sizes: '192x192', type: 'image/png', purpose: 'any' }
    ],
    screenshots: []
  };

  beforeEach(() => {
    // Simulamos a API de Blob que não existe nativamente no JSDOM
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/fake-uuid');
    global.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve empacotar os ficheiros e engatilhar o download do ZIP na DOM', async () => {
    // 1. Espiões na DOM real do JSDOM
    const appendChildSpy = vi.spyOn(document.body, 'appendChild');
    const removeChildSpy = vi.spyOn(document.body, 'removeChild');
    
    // 2. Espiamos o protótipo do clique nativo do elemento âncora.
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    // 3. Executamos o serviço principal
    await ZipExportService.exportPwa(mockManifest);

    // 4. Verificamos se a API de Blob foi chamada
    expect(global.URL.createObjectURL).toHaveBeenCalled();

    // 5. GUARD CLAUSE: Garantimos ao TypeScript que a chamada ocorreu
    const firstCall = appendChildSpy.mock.calls[0];
    if (!firstCall) {
      throw new Error('O método appendChild não foi chamado na DOM.');
    }

    // 6. Capturamos a tag <a> real que o serviço injetou no body (agora é seguro para o TS)
    const appendedNode = firstCall[0] as HTMLAnchorElement;
    
    // 7. Validamos as propriedades nativas do Node gerado
    expect(appendedNode.tagName).toBe('A');
    expect(appendedNode.download).toBe('pwa-builder-export.zip');
    expect(appendedNode.href).toBe('blob:http://localhost/fake-uuid');
    
    // 8. Verificamos as ações na DOM
    expect(appendChildSpy).toHaveBeenCalledWith(appendedNode);
    expect(clickSpy).toHaveBeenCalled(); // Confirmamos que forçou o download
    
    // 9. Verificamos a limpeza rigorosa de memória
    expect(removeChildSpy).toHaveBeenCalledWith(appendedNode);
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/fake-uuid');
  });
});