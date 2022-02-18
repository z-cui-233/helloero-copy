export interface GTagConfig {
  page_title: string;
  page_location: string;
}

interface TrackWindow {
  gtag: (type: string, tag: any, config?: GTagConfig) => void;
  dataLayer: any[];
}

export type CustomWindow = Window & typeof globalThis & TrackWindow;
