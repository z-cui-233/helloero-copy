import * as prismic from '@prismicio/client';
import * as prismicT from '@prismicio/types';
import * as prismicH from '@prismicio/helpers';
import { GetServerSidePropsContext } from 'next';
import { GuideDocument, SystemTroubleDocument } from './interfaces';
import { InfoDocument } from './interfaces';

const CUSTOM_TYPE = {
  INFO: 'info',
  GUIDE_TOP: 'guide_top',
  GUIDE_CATEGORY: 'guide_category',
  GUIDE: 'guide',
  SYSTEM_TROUBLE: 'systemtrouble',
} as const;

const apiClient = (ctx: GetServerSidePropsContext): prismic.Client => {
  const endpoint = prismic.getEndpoint('h2uhelp');
  const client = prismic.createClient(endpoint, { fetch });
  client.enableAutoPreviewsFromReq(ctx.req);

  return client;
};

const linkResolver: prismicH.LinkResolverFunction = (doc) => {
  if (doc.type === CUSTOM_TYPE.INFO) {
    return `/info/${doc.uid}`;
  }

  if (doc.type === CUSTOM_TYPE.GUIDE) {
    return `/guide/detail/${doc.uid}`;
  }

  return '/';
};

// 緊急のお知らせ
export const fetchSystemTroubleByUid = (args: {
  ctx: GetServerSidePropsContext;
}): Promise<SystemTroubleDocument | null> => {
  return apiClient(args.ctx)
    .getByUID<SystemTroubleDocument>(
      CUSTOM_TYPE.SYSTEM_TROUBLE,
      CUSTOM_TYPE.SYSTEM_TROUBLE
    )
    .catch(() => null);
};

// お知らせ一覧
export const fetchInfoList = (args: {
  ctx: GetServerSidePropsContext;
  pageSize: number;
  page: number;
}): Promise<prismicT.Query<InfoDocument> | null> => {
  return apiClient(args.ctx)
    .getByType<InfoDocument>(CUSTOM_TYPE.INFO, {
      pageSize: args.pageSize,
      page: args.page,
      orderings: [
        {
          field: `my.${CUSTOM_TYPE.INFO}.publish_date`,
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
  ctx: GetServerSidePropsContext;
  uid: string;
}): Promise<InfoDocument | null> => {
  return apiClient(args.ctx)
    .getByUID<InfoDocument>(CUSTOM_TYPE.INFO, args.uid)
    .catch(() => null);
};

// よくある質問TOP
export const fetchGuideTop = (args: {
  ctx: GetServerSidePropsContext;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient(args.ctx)
    .getSingle(CUSTOM_TYPE.GUIDE_TOP, {
      fetchLinks: ['guide_category.title'],
    })
    .catch(() => null);
};

// カテゴリ別よくある質問一覧
export const fetchGuideByCategoryId = (args: {
  ctx: GetServerSidePropsContext;
  uid: string;
}): Promise<prismicT.PrismicDocument | null> => {
  return apiClient(args.ctx)
    .getByUID(CUSTOM_TYPE.GUIDE_CATEGORY, args.uid, {
      fetchLinks: ['guide.question'],
    })
    .catch(() => null);
};

// よくある質問詳細
export const fetchGuideByUid = (args: {
  ctx: GetServerSidePropsContext;
  uid: string;
}): Promise<GuideDocument | null> => {
  return apiClient(args.ctx)
    .getByUID<GuideDocument>(CUSTOM_TYPE.GUIDE, args.uid)
    .catch(() => null);
};

// preview
export const fetchPreviewUrl = (args: {
  ctx: GetServerSidePropsContext;
  token: string;
  documentId: string;
}): Promise<string> => {
  return apiClient(args.ctx)
    .resolvePreviewURL({
      linkResolver,
      defaultURL: '/',
      previewToken: args.token,
      documentID: args.documentId,
    })
    .then((url: string) => url);
};
