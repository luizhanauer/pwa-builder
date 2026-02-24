import type { PwaManifest } from '../../composables/useManifest';

export class HtmlGeneratorService {
  /**
   * Gera o ficheiro index.html com as meta tags, SEO otimizado e o registo do Service Worker.
   */
  public static generate(manifest: PwaManifest): string {
    // Busca o ícone principal para injetar na meta tag da Apple (iOS)
    const appleIcon = manifest.icons.find(i => i.sizes === '192x192' && i.purpose === 'any');
    const iconTag = appleIcon ? `\n  <link rel="apple-touch-icon" href="./${appleIcon.src}">` : '';

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${manifest.name}</title>
  
  <meta name="description" content="${manifest.description}">
  <meta name="theme-color" content="${manifest.theme_color}">
  
  <link rel="manifest" href="./manifest.json">${iconTag}
  
  <style>
    body {
      margin: 0;
      background-color: ${manifest.background_color};
      color: #333333;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    
    /* O conteúdo principal assume o controlo do layout centralizado */
    main {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      box-sizing: border-box;
    }

    .pwa-icon {
      width: 120px;
      height: 120px;
      border-radius: 24px;
      margin-bottom: 2rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    h1 { margin: 0 0 0.5rem 0; font-size: 2rem; }
    p { margin: 0; color: #666666; line-height: 1.5; }
  </style>
</head>
<body>
  
  <main>
    ${appleIcon ? `<img src="./${appleIcon.src}" alt="${manifest.short_name} Logo" class="pwa-icon">` : ''}
    
    <h1>${manifest.short_name}</h1>
    <p>O seu PWA está pronto, instalado e a funcionar offline!</p>
  </main>

  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Registo feito usando caminho relativo
        navigator.serviceWorker.register('./sw.js', { scope: '${manifest.scope}' })
          .then(registration => {
            console.log('ServiceWorker registado com sucesso com o scope:', registration.scope);
          })
          .catch(error => {
            console.error('Falha ao registar o ServiceWorker:', error);
          });
      });
    }
  </script>
</body>
</html>`.trim();
  }
}