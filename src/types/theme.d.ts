import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      warning: string;
    };
    text: {
      primary: string;
      primaryInverted: string;
      standard: string;
      secondary: string;
      tertiary: string;
    };
    background: {
      primary: string;
      standard: string;
      secondary: string;
      tertiary: string;
    };
  }
}
