export class ImageProcessor {
  /**
   * Redimensiona uma imagem utilizando a API nativa do Canvas.
   * Implementa a lógica de "Crop to Fill" (semelhante ao object-fit: cover)
   * para evitar que a imagem fique achatada ou distorcida.
   */
  public static async resize(file: File, targetWidth: number, targetHeight: number): Promise<string> {
    const bitmap = await self.createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Não foi possível inicializar o contexto 2D do Canvas.');
    
    // Matemática para Crop (object-fit: cover)
    const sourceRatio = bitmap.width / bitmap.height;
    const targetRatio = targetWidth / targetHeight;

    let sourceWidth = bitmap.width;
    let sourceHeight = bitmap.height;
    let sourceX = 0;
    let sourceY = 0;

    if (sourceRatio > targetRatio) {
      // Imagem original é proporcionalmente mais larga que o alvo: Cortar laterais
      sourceWidth = bitmap.height * targetRatio;
      sourceX = (bitmap.width - sourceWidth) / 2;
    } else {
      // Imagem original é proporcionalmente mais alta que o alvo: Cortar topo e base
      sourceHeight = bitmap.width / targetRatio;
      sourceY = (bitmap.height - sourceHeight) / 2;
    }

    // Desenha cortando a parte exata da imagem original e preenchendo o canvas destino
    ctx.drawImage(
      bitmap,
      sourceX, sourceY, sourceWidth, sourceHeight, // Coordenadas e recortes da origem
      0, 0, targetWidth, targetHeight              // Coordenadas e tamanho no destino (Canvas)
    );
    
    bitmap.close();
    
    return canvas.toDataURL('image/png');
  }

  /**
   * Gera um placeholder dinâmico usando a Canvas API.
   */
  public static generatePlaceholder(
    width: number, 
    height: number, 
    text: string, 
    bgColor: string = '#cccccc', 
    textColor: string = '#ffffff'
  ): string {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Não foi possível inicializar o contexto 2D do Canvas.');

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const fontSize = Math.max(16, Math.floor(width / 10));
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(text, width / 2, height / 2);

    return canvas.toDataURL('image/png');
  }
}