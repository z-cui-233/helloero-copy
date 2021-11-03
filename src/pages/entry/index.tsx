import { NextPage, NextPageContext } from 'next';
import React from 'react';
import Entry from 'src/domain/Entry';

interface Props {
  wabiken: string;
}

const Page: NextPage<Props> = ({ wabiken }) => {
  return <Entry wabiken={wabiken} />;
};

Page.getInitialProps = async (context: NextPageContext) => {
  const wabiken = context.query.wabiken ?? '';

  return {
    wabiken: wabiken as string,
  };
};

export default Page;
