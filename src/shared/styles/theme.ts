import { DefaultTheme } from 'styled-components';

const colors = {
  red: 'rgba(255, 0, 50, 1)',
  pink: 'rgba(255, 204, 214, 1)',
  skin: 'rgba(245, 226, 226, 1)',
  blue: 'rgba(73, 95, 124, 1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',
  grey_50: 'rgba(127, 127, 127, 1)',
  grey_40: 'rgba(153, 153, 153, 1)',
  grey_20: 'rgba(204, 204, 204, 1)',
  grey_10: 'rgba(230, 230, 230, 1)',
  grey_05: 'rgba(242, 242, 242, 1)',
};

const themeColors: DefaultTheme = {
  text: {
    primary: colors.black,
    primaryInverted: colors.white,
    standard: colors.grey_50,
    secondary: colors.grey_40,
  },
  background: {
    primary: colors.red,
    standard: colors.white,
    secondary: colors.pink,
  },
  menuButton: {
    background: {
      default: colors.black,
      hover: colors.red,
      active: colors.skin,
    },
    icon: {
      default: colors.white,
      hover: colors.white,
      active: colors.red,
    },
  },
};

export type ThemeColorsType = typeof themeColors;
export default themeColors;
