import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';

const Top: React.FC = () => {
  return (
    <LayoutH2u options={globalConfig}>
      <Container>help.h2u</Container>
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

export default Top;
