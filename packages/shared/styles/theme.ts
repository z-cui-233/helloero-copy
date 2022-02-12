import { DefaultTheme } from 'styled-components';

const colors = {
  red: 'rgba(230, 0, 50, 1)',
  pink: 'rgba(255, 204, 214, 1)',
  skin: 'rgba(245, 226, 226, 1)',
  blue: 'rgba(73, 95, 124, 1)',
  white: 'rgba(255, 255, 255, 1)',
  error: 'rgba(193, 62, 6, 1)',
  black: 'rgba(0, 0, 0, 1)',
  black_80: 'rgba(0, 0, 0, 0.8)',
  black_60: 'rgba(0, 0, 0, 0.6)',
  black_40: 'rgba(0, 0, 0, 0.4)',
  grey_50: 'rgba(127, 127, 127, 1)',
  grey_40: 'rgba(153, 153, 153, 1)',
  grey_20: 'rgba(204, 204, 204, 1)',
  grey_10: 'rgba(230, 230, 230, 1)',
  grey_05: 'rgba(242, 242, 242, 1)',
};

const themeColors: DefaultTheme = {
  keyColor: {
    color1: colors.red,
    color2: colors.pink,
    color3: colors.skin,
    color4: colors.blue,
    error: colors.error,
  },
  foreground: {
    primary: colors.black,
    primaryInverted: colors.white,
    secondary: colors.black_80,
    tertiary: colors.black_60,
    quaternary: colors.black_40,
  },
  background: {
    primary: colors.white,
    primaryInverted: colors.black,
    secondary: colors.grey_05,
    tertiary: colors.grey_10,
    quaternary: colors.grey_20,
    quinary: colors.grey_40,
  },
};

export type ThemeColorsType = typeof themeColors;
export default themeColors;
