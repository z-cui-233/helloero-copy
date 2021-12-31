import * as prismicT from '@prismicio/types';

export type InfoDocument = prismicT.PrismicDocument<{
  title: prismicT.RichTextField;
  text: prismicT.RichTextField;
  publish_date: prismicT.DateField;
}>;
