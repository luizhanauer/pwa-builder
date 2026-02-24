import JSZip from 'jszip';
import type { PwaManifest, PwaIcon, PwaScreenshot } from '../../composables/useManifest';
import { ImageProcessor } from './ImageProcessor';
import { ServiceWorkerGenerator } from './ServiceWorkerGenerator';
import { HtmlGeneratorService } from './HtmlGeneratorService';

export class ZipExportService {
  /**
   * Empacota o manifesto, o service worker, o index.html e as imagens num ficheiro ZIP e inicia o download.
   */
  public static async exportPwa(manifest: PwaManifest): Promise<void> {
    const zip = new JSZip();
    
    // 1. Clonagem profunda do manifesto para não mutar o estado reativo da aplicação
    const cleanManifest: PwaManifest = JSON.parse(JSON.stringify(manifest));
    
    // 2. Criação das pastas no ZIP
    const iconsFolder = zip.folder('icons');
    const screenshotsFolder = zip.folder('screenshots');

    // 3. Usamos um Set para garantir que não processamos imagens duplicadas
    const generatedFiles = new Set<string>();

    // 4. Processamento de Ícones com tipagem estrita
    if (iconsFolder && cleanManifest.icons.length > 0) {
      cleanManifest.icons = this.processIcons(
        cleanManifest.icons, 
        iconsFolder, 
        cleanManifest, 
        generatedFiles
      );
    }

    // 5. Processamento de Screenshots com tipagem estrita
    if (screenshotsFolder && cleanManifest.screenshots.length > 0) {
      cleanManifest.screenshots = this.processScreenshots(
        cleanManifest.screenshots, 
        screenshotsFolder, 
        cleanManifest, 
        generatedFiles
      );
    }

    // 6. Adiciona o manifest.json limpo ao ZIP
    zip.file('manifest.json', JSON.stringify(cleanManifest, null, 2));

    // 7. Extrai os caminhos de todas as imagens geradas para colocar na cache offline
    const dynamicAssets: string[] = [
      ...cleanManifest.icons.map((icon) => icon.src),
      ...cleanManifest.screenshots.map((screenshot) => screenshot.src)
    ];

    // 8. Gera e adiciona o Service Worker (sw.js) na raiz do ZIP com os assets dinâmicos
    const swContent = ServiceWorkerGenerator.generate(
      cleanManifest.short_name, 
      cleanManifest.start_url,
      dynamicAssets
    );
    zip.file('sw.js', swContent);

    // 9. Gera o ficheiro HTML principal com o registo e as meta tags
    const htmlContent = HtmlGeneratorService.generate(cleanManifest);
    zip.file('index.html', htmlContent);

    // 10. Gera o binário do ZIP e força o download
    const content = await zip.generateAsync({ type: 'blob' });
    this.triggerDownload(content, 'pwa-builder-export.zip');
  }

  private static processIcons(
    icons: PwaIcon[], 
    folder: JSZip, 
    manifest: PwaManifest,
    generatedFiles: Set<string>
  ): PwaIcon[] {
    return icons.map((icon) => {
      const sizeStr = icon.sizes.split('x')[0] || '512';
      const targetWidth = parseInt(sizeStr, 10);
      const fileName = `icon-${sizeStr}.png`;

      this.ensureImageInZip(
        fileName, 
        icon.src, 
        targetWidth, 
        targetWidth, 
        manifest.short_name.charAt(0).toUpperCase() || 'P', 
        manifest.theme_color, 
        folder, 
        generatedFiles
      );

      return { ...icon, src: `icons/${fileName}` };
    });
  }

  private static processScreenshots(
    screenshots: PwaScreenshot[], 
    folder: JSZip, 
    manifest: PwaManifest,
    generatedFiles: Set<string>
  ): PwaScreenshot[] {
    return screenshots.map((screenshot) => {
      const parts = screenshot.sizes.split('x');
      
      const targetWidth = parseInt(parts[0] || '1000', 10);
      const targetHeight = parseInt(parts[1] || '600', 10);
      
      const typeName = screenshot.form_factor === 'wide' ? 'desktop' : 'mobile';
      const fileName = `screenshot-${typeName}.png`;

      this.ensureImageInZip(
        fileName, 
        screenshot.src, 
        targetWidth, 
        targetHeight, 
        screenshot.form_factor === 'wide' ? 'Desktop' : 'Mobile', 
        manifest.theme_color, 
        folder, 
        generatedFiles
      );

      return { ...screenshot, src: `screenshots/${fileName}` };
    });
  }

  private static ensureImageInZip(
    fileName: string, 
    originalSrc: string, 
    width: number, 
    height: number, 
    fallbackText: string, 
    themeColor: string, 
    folder: JSZip, 
    generatedFiles: Set<string>
  ): void {
    if (generatedFiles.has(fileName)) return;

    let base64Data = '';

    if (originalSrc.startsWith('data:image')) {
      base64Data = originalSrc.split(',')[1] || '';
    } else {
      const fullBase64 = ImageProcessor.generatePlaceholder(width, height, fallbackText, themeColor);
      base64Data = fullBase64.split(',')[1] || '';
    }

    if (base64Data) {
      folder.file(fileName, base64Data, { base64: true });
      generatedFiles.add(fileName);
    }
  }

  private static triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}