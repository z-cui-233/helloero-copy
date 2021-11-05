import React from 'react';
import styled from 'styled-components';
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
  const { state } = useWabikenEntryContext();

  return (
    <Container>
      {state.flowStatus === FLOW_STATUS.INPUT && <InputForm />}
      {state.flowStatus === FLOW_STATUS.CONFIRM && <ConfirmForm />}
      {state.flowStatus === FLOW_STATUS.COMPLETE && <NoticeComplete />}
    </Container>
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

const WrappedComponent: React.FC = () => (
  <WabikenEntryProvider>
    <Entry />
  </WabikenEntryProvider>
);

export default withLayout(withAmplifyAuth(WrappedComponent));
