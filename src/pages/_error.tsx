import React from 'react';
import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import CustomError from 'src/domain/CustomError';

const Page: NextPage<ErrorProps> = ({ statusCode }) => {
  return <CustomError statusCode={statusCode} />;
};

export default Page;
