import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import React from 'react';
import { useLocale } from '../../context/LocaleContext';

type Props = {
  host: string;
  title: string;
  description?: string;
};

const MetaTags: React.FC<Props> = ({ host, title, description }) => {
  const { asPath } = useRouter();
  const { locale } = useLocale();

  const canonicalPath = asPath.split('?')[0];
  const canonicalUrl = `${host}/${locale}${canonicalPath}`;
  const ogImageUrl = `${host}/images/share.jpg`;

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
      <meta property="og:image" content={ogImageUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default MetaTags;
