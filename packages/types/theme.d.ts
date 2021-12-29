import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    keyColor: {
      color1: string;
      color2: string;
      color3: string;
      color4: string;
      color5: string;
    };
    foreground: {
      primary: string;
      primaryInverted: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
    background: {
      primary: string;
      primaryInverted: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      quinary: string;
    };
  }
}
