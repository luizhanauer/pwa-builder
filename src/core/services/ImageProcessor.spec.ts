import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ImageProcessor } from './ImageProcessor';

describe('ImageProcessor', () => {
  // Simulador do contexto 2D do Canvas
  const mockContext = {
    drawImage: vi.fn(),
    fillStyle: '',
    fillRect: vi.fn(),
    font: '',
    textAlign: '',
    textBaseline: '',
    fillText: vi.fn(),
  };

  beforeEach(() => {
    // Intercetamos a criação do Canvas e injetamos o nosso mock
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mocked-string');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve gerar um placeholder com as dimensões e cores corretas', () => {
    const base64 = ImageProcessor.generatePlaceholder(512, 512, 'P', '#ff0000', '#ffffff');
    
    // Verifica se a string final é a esperada
    expect(base64).toBe('data:image/png;base64,mocked-string');
    
    // Verifica se as funções do Canvas foram chamadas com os parâmetros de cor
    expect(mockContext.fillStyle).toBe('#ffffff'); // A última cor setada foi o texto
    expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 512, 512);
    expect(mockContext.fillText).toHaveBeenCalledWith('P', 256, 256); // Texto centralizado
  });

  it('deve redimensionar uma imagem aplicando Crop to Fill (Paisagem para Quadrado)', async () => {
    // Simulamos uma imagem retangular (2000x1000)
    const mockBitmap = { width: 2000, height: 1000, close: vi.fn() };
    vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue(mockBitmap));

    // Criamos um File falso para satisfazer o TypeScript Estrito
    const dummyFile = new File([''], 'teste.png', { type: 'image/png' });

    // Pedimos para cortar para um quadrado (500x500)
    await ImageProcessor.resize(dummyFile, 500, 500);

    // O rácio da origem é 2.0 (2000/1000). O destino é 1.0 (500/500).
    // A matemática deve cortar as laterais (sourceX deve ser 500)
    // Argumentos do drawImage: image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      mockBitmap,
      500, 0, 1000, 1000, // Corta exatamente o centro da imagem original
      0, 0, 500, 500      // Desenha preenchendo o canvas alvo inteiro
    );
    expect(mockBitmap.close).toHaveBeenCalled();
  });

  it('deve redimensionar uma imagem aplicando Crop to Fill (Retrato para Paisagem)', async () => {
    // Simulamos uma imagem vertical (1000x2000)
    const mockBitmap = { width: 1000, height: 2000, close: vi.fn() };
    vi.stubGlobal('createImageBitmap', vi.fn().mockResolvedValue(mockBitmap));

    const dummyFile = new File([''], 'teste.png', { type: 'image/png' });

    // Pedimos para cortar para formato paisagem (1000x500)
    await ImageProcessor.resize(dummyFile, 1000, 500);

    // O rácio da origem é 0.5 (1000/2000). O destino é 2.0 (1000/500).
    // A matemática deve cortar topo e base (sourceY deve ser 750)
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      mockBitmap,
      0, 750, 1000, 500, // Corta o centro vertical
      0, 0, 1000, 500
    );
  });
});