export const cookieParams = {
  uuid: {
    name: '_uuid',
    path: '/',
    expires: () => new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * 365),
    secure: true,
    httpOnly: false,
  },
  wabiken: {
    name: '_wabiken',
    path: '/',
    secure: true,
    httpOnly: false,
  },
};
