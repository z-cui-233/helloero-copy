import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import H2uServices from './H2uServices';
import SiteMenus from './SiteMenus';

const Top: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <Container>
        <H2uServices />
        <SiteMenus />
      </Container>
    </LayoutH2u>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

export default Top;
