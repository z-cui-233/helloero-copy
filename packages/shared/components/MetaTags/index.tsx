import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useLocale } from '../../context/LocaleContext';

type Props = {
  host: string;
  title: string;
  description?: string;
  isMultiLang?: boolean;
};

const MetaTags: React.FC<Props> = ({
  host,
  title,
  description,
  isMultiLang = true,
}) => {
  const { asPath } = useRouter();
  const { locale } = useLocale();

  const canonicalPath = asPath.split('?')[0];
  const canonicalUrl = `${host}/${locale}${canonicalPath}`;
  const canonicalJaUrl = `${host}/ja${canonicalPath}`;
  const canonicalEnUrl = `${host}/en${canonicalPath}`;

  return (
    <Head>
      <title key="title">{title}</title>
      {description && (
        <meta content={description} name="description" key="description" />
      )}
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:url" content={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
      {isMultiLang && (
        <React.Fragment>
          <link rel="alternate" hrefLang="en" href={canonicalEnUrl} />
          <link rel="alternate" hrefLang="ja" href={canonicalJaUrl} />
          <link rel="alternate" hrefLang="x-default" href={canonicalJaUrl} />
        </React.Fragment>
      )}
    </Head>
  );
};

export default MetaTags;
