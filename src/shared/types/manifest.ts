export type DisplayMode = 'standalone' | 'browser' | 'fullscreen' | 'minimal-ui';

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
  theme_color: string;
  background_color: string;
  display: DisplayMode;
  start_url: string;
  icons: PwaIcon[];
  screenshots: PwaScreenshot[];
}