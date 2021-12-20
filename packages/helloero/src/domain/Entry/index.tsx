import React from 'react';
import withLayout from '@/shared/components/Layout';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';
import { globalConfig } from 'src/globalConfig';

const Entry: React.FC = () => {
  const store = useEntryWabiken();

  return (
    <React.Fragment>
      {store.entryWabikenState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm {...store} />
      )}
      {store.entryWabikenState.pageStatus === PAGE_STATUS.CONFIRM && (
        <ConfirmForm {...store} />
      )}
      {store.entryWabikenState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </React.Fragment>
  );
};

export default withLayout(withAmplifyAuth(Entry, globalConfig), globalConfig);
