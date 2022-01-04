import * as prismicT from '@prismicio/types';

export type GuideDocument = prismicT.PrismicDocument<{
  question: prismicT.RichTextField;
  answer: prismicT.RichTextField;
  search_text: prismicT.KeyTextField;
  page_title: prismicT.RichTextField;
  page_description: prismicT.RichTextField;
}>;

export type GuideCategoryDocument = prismicT.PrismicDocument<{
  management_title: prismicT.RichTextField;
  title: prismicT.RichTextField;
  guide_links: { guide_link: GuideDocument }[]; // 正しい設定が不明
}>;

export type GuideTopDocument = prismicT.PrismicDocument<{
  title: prismicT.RichTextField;
  category_links: {
    category_link: GuideCategoryDocument; // 正しい設定が不明
  }[];
}>;
