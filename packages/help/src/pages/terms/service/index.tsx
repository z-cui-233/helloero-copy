import { NextPage } from 'next';
import React from 'react';
import TermsService from '@/domain/TermsService';

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <TermsService />
    </React.Fragment>
  );
};

export default Page;
