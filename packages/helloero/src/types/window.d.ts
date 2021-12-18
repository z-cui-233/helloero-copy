export interface GTagConfig {
  page_title: string;
  page_location: string;
}

interface TrackWindow {
  gtag(type: 'config', tag: string, config: GTagConfig): void;
}

export type CustomWindow = Window & typeof globalThis & TrackWindow;
