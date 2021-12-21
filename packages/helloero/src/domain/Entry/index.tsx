import React from 'react';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

const Entry: React.FC = () => {
  const store = useEntryWabiken();

  return (
    <LayoutHelloero options={globalConfig}>
      {store.entryWabikenState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm {...store} />
      )}
      {store.entryWabikenState.pageStatus === PAGE_STATUS.CONFIRM && (
        <ConfirmForm {...store} />
      )}
      {store.entryWabikenState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutHelloero>
  );
};

export default withAmplifyAuth(Entry, globalConfig);
