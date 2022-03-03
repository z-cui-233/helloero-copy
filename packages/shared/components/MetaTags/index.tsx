import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

type Props = {
  host: string;
  title: string;
  description?: string;
  canonicalUrl?: string;
};

const MetaTags: React.FC<Props> = ({
  host,
  title,
  description,
  canonicalUrl,
}) => {
  const { asPath } = useRouter();
  const path = asPath.split('?')[0];
  const url = canonicalUrl ?? `${host}/${path}`;

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
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${host}/images/share.jpg`} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default MetaTags;
