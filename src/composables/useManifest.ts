import { reactive, computed } from 'vue';

export interface PwaIcon {
  src: string;
  sizes: string;
  type: string;
  purpose: 'any' | 'maskable' | 'monochrome';
}

export interface PwaScreenshot {
  src: string;
  sizes: string;
  type: string;
  form_factor?: 'wide' | 'narrow';
  label?: string;
}

export interface PwaManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  scope: string;
  display: 'standalone' | 'minimal-ui' | 'fullscreen' | 'browser';
  background_color: string;
  theme_color: string;
  icons: PwaIcon[];
  screenshots: PwaScreenshot[];
}

const state = reactive<PwaManifest>({
  name: 'Meu App Progressivo',
  short_name: 'MeuPWA',
  description: 'Uma descrição incrível do meu aplicativo.',
  // MUDANÇA: Usar ponto e barra para garantir relatividade
  start_url: './',
  scope: './', 
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#3b82f6',
  icons: [
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ],
  screenshots: [
    { src: 'screenshots/screenshot-desktop.png', sizes: '1000x600', type: 'image/png', form_factor: 'wide', label: 'Aplicação no Computador' },
    { src: 'screenshots/screenshot-mobile.png', sizes: '600x1000', type: 'image/png', form_factor: 'narrow', label: 'Aplicação no Telemóvel' }
  ]
});

export function useManifest() {
  const manifestJson = computed(() => {
    return JSON.stringify(state, null, 2);
  });

  const addIcon = () => {
    state.icons.push({ src: '', sizes: '512x512', type: 'image/png', purpose: 'any' });
  };

  const removeIcon = (index: number) => {
    state.icons.splice(index, 1);
  };

  const addScreenshot = (screenshot: PwaScreenshot) => {
    state.screenshots.push(screenshot);
  };

  const removeScreenshot = (index: number) => {
    state.screenshots.splice(index, 1);
  };

  return { state, manifestJson, addIcon, removeIcon, addScreenshot, removeScreenshot };
}