import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useAccountDeletion, { PAGE_STATUS } from './useAccountDeletion';

const AccountDeletion: React.FC = () => {
  const { accountDeletionState, toggleConfirmDialog, invokeDeletion } =
    useAccountDeletion();
  return (
    <LayoutH2u options={globalConfig}>
      {accountDeletionState.pageStatus === PAGE_STATUS.CONFIRM && (
        <ConfirmForm
          accountDeletionState={accountDeletionState}
          toggleConfirmDialog={toggleConfirmDialog}
          invokeDeletion={invokeDeletion}
        />
      )}
      {accountDeletionState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default AccountDeletion;
