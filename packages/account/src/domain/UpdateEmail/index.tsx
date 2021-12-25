import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InputEmailForm from './InputEmailForm';
import useUpdateEmail, { PAGE_STATUS } from './useUpdateEmail';
import InputVerificationCodeForm from './InputVerificationCodeForm';
import NoticeComplete from './NoticeComplete';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import LayoutH2u from '@/shared/components/LayoutH2u';

const UpdateEmail: React.FC = () => {
  const store = useUpdateEmail();

  return (
    <LayoutH2u options={globalConfig}>
      {store.updateEmailState.pageStatus === PAGE_STATUS.INPUT_EMAIL && (
        <InputEmailForm {...store} />
      )}
      {store.updateEmailState.pageStatus ===
        PAGE_STATUS.INPUT_VERIFICATION_CODE && (
        <InputVerificationCodeForm {...store} />
      )}
      {store.updateEmailState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default withAmplifyAuth(UpdateEmail, globalConfig);
