import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import PurchasedList from './PurchasedList';
import WabikenMenu from './WabikenMenu';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

const MyLibrary: React.FC = () => {
  return (
    <LayoutHelloero options={globalConfig}>
      <Container>
        <WabikenMenu />
        <PurchasedList />
      </Container>
    </LayoutHelloero>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

export default withAmplifyAuth(MyLibrary, globalConfig);
