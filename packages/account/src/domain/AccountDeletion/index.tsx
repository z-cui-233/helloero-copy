import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';

const AccountDeletion: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <div>AccountDeletion</div>
    </LayoutH2u>
  );
};

export default withAmplifyAuth(AccountDeletion, globalConfig);
