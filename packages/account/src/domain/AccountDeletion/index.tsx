import React from 'react';
import { globalConfig } from 'src/globalConfig';
import useAccountDeletion, { PAGE_STATUS } from './useAccountDeletion';
import NoticeComplete from './NoticeComplete';
import ConfirmForm from './ConfirmForm';
import LayoutH2u from '@/shared/components/LayoutH2u';

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
