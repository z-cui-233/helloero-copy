import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

const EntryFlow: React.FC = () => {
  const { entryWabikenState, confirmWabiken, consumeWabiken } =
    useEntryWabiken();

  return (
    <LayoutHelloero options={globalConfig}>
      {entryWabikenState.pageStatus === PAGE_STATUS.INPUT && (
        <InputForm
          entryWabikenState={entryWabikenState}
          confirmWabiken={confirmWabiken}
        />
      )}
      {entryWabikenState.pageStatus === PAGE_STATUS.CONFIRM && (
        <ConfirmForm
          entryWabikenState={entryWabikenState}
          consumeWabiken={consumeWabiken}
        />
      )}
      {entryWabikenState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutHelloero>
  );
};

export default withAmplifyAuth(EntryFlow, globalConfig);
