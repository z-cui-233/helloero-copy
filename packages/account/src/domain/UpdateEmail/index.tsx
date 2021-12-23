import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import InputForm from './InputForm';
import useUpdateEmail, { PAGE_STATUS } from './useUpdateEmail';

const UpdateEmail: React.FC = () => {
  const store = useUpdateEmail();

  return (
    <LayoutH2u options={globalConfig}>
      <Container>
        {store.updateEmailState.pageStatus === PAGE_STATUS.INPUT && (
          <InputForm />
        )}
      </Container>
    </LayoutH2u>
  );
};

const Container = styled.div`
  max-width: 640px;
  margin: 2rem auto 0;
  width: calc(100% - 2rem);
  padding: 4rem 0 0;
  position: relative;
`;

export default withAmplifyAuth(UpdateEmail, globalConfig);
