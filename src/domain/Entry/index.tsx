import React from 'react';
import withLayout from 'src/shared/components/Layout';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';
import useEntryWabiken, { PAGE_STATUS } from './useEntryWabiken';

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

export default withLayout(withAmplifyAuth(Entry));
