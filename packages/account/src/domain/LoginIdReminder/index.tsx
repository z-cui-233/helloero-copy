import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import InputForm from './InputForm';
import NoticeComplete from './NoticeComplete';
import useLoginIdReminder, { PAGE_STATUS } from './useLoginIdReminder';

const LoginIdReminder: React.FC = () => {
  const { loginIdReminderState, sendReminder } = useLoginIdReminder();

  return (
    <LayoutH2u options={globalConfig}>
      {loginIdReminderState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm
          loginIdReminderState={loginIdReminderState}
          sendReminder={sendReminder}
        />
      )}
      {loginIdReminderState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutH2u>
  );
};

export default LoginIdReminder;
