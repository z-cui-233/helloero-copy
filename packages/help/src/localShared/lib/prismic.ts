import * as prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';

const API_ENDPOINT = 'https://helpcenter.cdn.prismic.io/api/v2';

const apiClient = (): prismic.Client => {
  return prismic.createClient(API_ENDPOINT, { fetch });
};

// お知らせ詳細
export const fetchInfoByUid = (args: {
  uid: string;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient()
    .getByUID('info', args.uid)
    .catch(() => null);
};
