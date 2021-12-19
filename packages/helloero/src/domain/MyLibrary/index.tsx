import React from 'react';
import withLayout from '@/shared/components/Layout';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';
import PurchasedList from './PurchasedList';
import WabikenMenu from './WabikenMenu';

const MyLibrary: React.FC = () => {
  return (
    <Container>
      <WabikenMenu />
      <PurchasedList />
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

export default withLayout(withAmplifyAuth(MyLibrary));
