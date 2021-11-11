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
      primaryInverted: string;
      standard: string;
      secondary: string;
      tertiary: string;
    };
    filter: {
      primary: string;
      standard: string;
      secondary: string;
    };
    input: {
      background: string;
      border: string;
      warning: string;
    };
    searchInput: {
      background: string;
      icon: string;
    };
    filterButton: {
      color: string;
    };
    button: {
      background: {
        default: string;
        hover: string;
      };
      text: {
        default: string;
        hover: string;
      };
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
