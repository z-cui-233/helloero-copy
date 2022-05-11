import { NextPage } from 'next';
import { ErrorProps } from 'next/error';
import React from 'react';
import CustomError from '@/domain/CustomError';

const Page: NextPage<ErrorProps> = () => {
  return <CustomError statusCode={404} />;
};

export default Page;
