import React from 'react';
import withLayout from 'src/shared/components/Layout';
import { TitleDetailCardProvider } from 'src/shared/context/TitleDetailCardContext';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';
import TitleDetail from './TitleDetail';
import PurchasedList from './PurchasedList';
import WabikenMenu from './WabikenMenu';
import { TitleListProvider } from 'src/shared/context/TitleListContext';

const MyLibrary: React.FC = () => {
  return (
    <TitleDetailCardProvider>
      <TitleListProvider>
        <Container>
          <WabikenMenu />
          <PurchasedList />
          <TitleDetail />
        </Container>
      </TitleListProvider>
    </TitleDetailCardProvider>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 0 auto;
  width: calc(100% - 2rem);
`;

export default withLayout(withAmplifyAuth(MyLibrary));
