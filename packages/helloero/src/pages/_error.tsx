import { NextPage, NextPageContext } from 'next';
import { ErrorProps } from 'next/error';
import React from 'react';
import CustomError from '@/domain/CustomError';

const Page: NextPage<ErrorProps> = ({ statusCode }) => {
  return <CustomError statusCode={statusCode} />;
};

Page.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return {
    statusCode: statusCode as number,
  };
};

export default Page;
