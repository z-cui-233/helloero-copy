import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useLocale } from '../../context/LocaleContext';

interface Props {
  host: string;
  title: string;
  description?: string;
}

const MetaTags: React.FC<Props> = ({ host, title, description }) => {
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
      <link rel="alternate" hrefLang="en" href={canonicalEnUrl} />
      <link rel="alternate" hrefLang="ja" href={canonicalJaUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalJaUrl} />
    </Head>
  );
};

export default MetaTags;
