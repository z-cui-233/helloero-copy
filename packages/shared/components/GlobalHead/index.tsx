import Head from 'next/head';
import React from 'react';

const GlobalHead: React.FC = () => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link
        rel="shortcut icon"
        type="image/png"
        href="/images/favicon.png?t=20211101"
      />
      <link
        rel="apple-touch-icon"
        href="/images/apple-touch-icon.png?t=20211101"
      />
      <title>HELLOERO powered by H2U</title>
    </Head>
  );
};

export default GlobalHead;
