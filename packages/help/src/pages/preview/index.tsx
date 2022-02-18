import * as prismic from '@prismicio/client';
import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import nookies from 'nookies';
import { fetchPreviewUrl } from '@/localShared/lib/prismic';

const Page: NextPage = () => <div>preview page</div>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.query.token as string;
  const documentId = ctx.query.documentId as string;

  nookies.set(ctx, prismic.cookie.preview, token, {
    maxAge: 30 * 60 * 1000,
    path: '/',
  });

  const redirectUrl = await fetchPreviewUrl({ ctx, token, documentId });
  return {
    redirect: {
      statusCode: 303,
      destination: redirectUrl,
    },
  };
};

export default Page;
