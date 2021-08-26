import { DefaultTheme } from 'styled-components';
import { transparentize } from 'polished';

const BASE_COLORS = {
  primary: 'rgba(255, 89, 99, 1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(43, 38, 71, 1)',
  warning: 'rgba(240, 45, 45, 1)',
};

const colors = {
  ...BASE_COLORS,
  black: transparentize(0, BASE_COLORS.black),
  black_80: transparentize(0.2, BASE_COLORS.black),
  black_60: transparentize(0.4, BASE_COLORS.black),
  black_30: transparentize(0.7, BASE_COLORS.black),
  black_10: transparentize(0.9, BASE_COLORS.black),
  white: transparentize(0, BASE_COLORS.white),
  white_80: transparentize(0.2, BASE_COLORS.white),
  white_60: transparentize(0.4, BASE_COLORS.white),
  white_10: transparentize(0.9, BASE_COLORS.white),
  pink: transparentize(0, BASE_COLORS.primary),
  pink_80: transparentize(0.2, BASE_COLORS.primary),
  pink_20: transparentize(0.8, BASE_COLORS.primary),
  warning: BASE_COLORS.warning,
};

const themeColors: DefaultTheme = {
  color: {
    primary: colors.primary,
    warning: colors.warning,
  },
  text: {
    primary: colors.black,
    primaryInverted: colors.white,
    standard: colors.black_80,
    secondary: colors.black_60,
    tertiary: colors.black_30,
  },
  background: {
    primary: colors.white,
    standard: colors.white_80,
    secondary: colors.white_60,
    tertiary: colors.white_10,
  },
};

export type ThemeColorsType = typeof themeColors;
export default themeColors;
