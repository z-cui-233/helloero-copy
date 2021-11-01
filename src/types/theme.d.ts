import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      primary: string;
      primaryInverted: string;
      standard: string;
      secondary: string;
    };
    background: {
      primary: string;
      standard: string;
      secondary: string;
    };
    menuButton: {
      background: {
        default: string;
        hover: string;
        active: string;
      };
      icon: {
        default: string;
        hover: string;
        active: string;
      };
    };
  }
}
