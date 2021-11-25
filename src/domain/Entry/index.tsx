import React from 'react';
import withLayout from 'src/shared/components/Layout';
import {
  FLOW_STATUS,
  useWabikenEntryContext,
  WabikenEntryProvider,
} from 'src/shared/context/WabikenEntryContext';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import InputForm from './InputForm';
import ConfirmForm from './ConfirmForm';
import NoticeComplete from './NoticeComplete';

const Entry: React.FC = () => {
  const WrappedComponent: React.FC = () => {
    const { state } = useWabikenEntryContext();

    return (
      <React.Fragment>
        {state.flowStatus === FLOW_STATUS.INPUT && <InputForm />}
        {state.flowStatus === FLOW_STATUS.CONFIRM && <ConfirmForm />}
        {state.flowStatus === FLOW_STATUS.COMPLETE && <NoticeComplete />}
      </React.Fragment>
    );
  };

  return (
    <WabikenEntryProvider>
      <WrappedComponent />
    </WabikenEntryProvider>
  );
};

export default withLayout(withAmplifyAuth(Entry));
