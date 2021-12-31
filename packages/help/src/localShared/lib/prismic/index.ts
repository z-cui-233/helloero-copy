import * as prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';

const apiClient = (): prismic.Client => {
  const endpoint = prismic.getEndpoint('h2uhelp');
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

// よくある質問TOP
export const fetchGuideTop = (): Promise<prismicT.PrismicDocument | null> => {
  return apiClient()
    .getSingle('guide_top', {
      fetchLinks: ['guide_category.title'],
    })
    .catch(() => null);
};

// カテゴリ別よくある質問一覧
export const fetchGuideByCategoryId = (args: {
  uid: string;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient()
    .getByUID('guide_category', args.uid, {
      fetchLinks: ['guide.question'],
    })
    .catch(() => null);
};

// よくある質問詳細
export const fetchGuideByUid = (args: {
  uid: string;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient()
    .getByUID('guide', args.uid)
    .catch(() => null);
};
