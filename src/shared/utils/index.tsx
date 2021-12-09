export const thumbnailUrlWithParams = (url: string): string => {
  const query =
    '?output-quality=60&output-format=jpg&downsize=384px:*&letterbox=5:7&bgblur=50,0.5';

  const hasProtocol = url.indexOf('http') !== -1;

  return `${hasProtocol ? '' : 'https://'}${url}${query}`;
};
