import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import ConfirmForm from './ConfirmForm';
import InputForm from './InputForm';
import NoticeComplete from './NoticeComplete';
import WaitForCompletion from './WaitForCompletion';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';

const EntryFlow: React.FC = () => {
  const { entryWabikenState, confirmWabiken, consumeWabiken, waitComplete } =
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
      {entryWabikenState.pageStatus === PAGE_STATUS.WAITING && (
        <WaitForCompletion waitComplete={waitComplete} />
      )}
      {entryWabikenState.pageStatus === PAGE_STATUS.COMPLETE && (
        <NoticeComplete />
      )}
    </LayoutHelloero>
  );
};

export default withAmplifyAuth(EntryFlow, globalConfig);
