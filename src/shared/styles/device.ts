const STYLE_BREAKPOINTS = {
  MOBILE: 560,
  TABLET: 768,
  SD: 1024,
};

const device = {
  mobile: `(max-width: ${STYLE_BREAKPOINTS.MOBILE}px)`,
  ltTablet: `(max-width: ${STYLE_BREAKPOINTS.TABLET - 1}px)`, //767まで
  tablet: `(max-width: ${STYLE_BREAKPOINTS.TABLET}px)`, // 768まで
  ltSd: `(max-width: ${STYLE_BREAKPOINTS.SD - 1}px)`, // 1023まで
  sd: `(max-width: ${STYLE_BREAKPOINTS.SD}px)`, // 1024まで
};

export default device;
