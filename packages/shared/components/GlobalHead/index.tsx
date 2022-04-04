import Head from 'next/head';
import React from 'react';

const GlobalHead: React.FC = () => (
  <Head>
    <title key="title">H2U</title>
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0"
    />
    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    <link
      rel="shortcut icon"
      type="image/png"
      href="/images/favicon.png?t=20220208"
    />
    <link
      rel="apple-touch-icon"
      href="/images/apple-touch-icon.png?t=20220208"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/android-icon.png?t=20220208"
    />
  </Head>
);

export default GlobalHead;
