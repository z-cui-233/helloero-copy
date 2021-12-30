import * as prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';

const apiClient = (): prismic.Client => {
  const endpoint = prismic.getEndpoint('helpcenter');
  return prismic.createClient(endpoint, { fetch });
};

// お知らせ一覧
export const fetchInfoList = (args: {
  pageSize: number;
  page: number;
}): Promise<prismicT.Query<prismicT.PrismicDocument> | null> => {
  return apiClient()
    .getByType('info', {
      pageSize: args.pageSize,
      page: args.page,
      orderings: [
        {
          field: 'my.info.publish_date',
          direction: 'desc',
        },
        {
          field: 'document.last_publication_date',
          direction: 'desc',
        },
      ],
    })
    .catch(() => null);
};

// お知らせ詳細
export const fetchInfoByUid = (args: {
  uid: string;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient()
    .getByUID('info', args.uid)
    .catch(() => null);
};
