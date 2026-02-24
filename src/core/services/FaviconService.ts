export class FaviconService {
  /**
   * Atualiza o favicon do navegador com o ícone de raio na cor especificada
   */
  static updateWithColor(color: string): void {
    // 1. O SVG do raio que você está usando (codificado para URL)
    // Substituímos o stroke="currentColor" por stroke="${color}"
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${encodeURIComponent(color)}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    `.trim();

    const dataUrl = `data:image/svg+xml,${svg}`;

    // 2. Encontra ou cria a tag de favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.head.appendChild(link);
    }

    link.href = dataUrl;
  }
}