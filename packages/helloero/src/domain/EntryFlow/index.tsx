import React from 'react';
import { globalConfig } from 'src/globalConfig';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import BigBar from '@/shared/components/BigBar';
import { useLocale } from '@/shared/context/LocaleContext';

const EntryFlow: React.FC = () => {
  const { entryWabikenState, confirmWabiken, consumeWabiken } =
    useEntryWabiken();
  const { lang } = useLocale();

  return (
    <LayoutHelloero options={globalConfig}>
      <BigBar title={lang.helloero.entry.title} />
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
