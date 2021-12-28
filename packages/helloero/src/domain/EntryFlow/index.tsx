import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

const EntryFlow: React.FC = () => {
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

export default withAmplifyAuth(EntryFlow, globalConfig);
