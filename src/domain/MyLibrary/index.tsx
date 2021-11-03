import React from 'react';
import withLayout from 'src/shared/components/Layout';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';
import PurchasedContents from './PurchasedContents';
import WabikenForm from './WabikenForm';

const MyLibrary: React.FC = () => {
  return (
    <Container>
      <WabikenForm />
      <PurchasedContents />
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

export default withLayout(withAmplifyAuth(MyLibrary));
