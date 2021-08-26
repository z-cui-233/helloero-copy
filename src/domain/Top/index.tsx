import React from 'react';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';

const Top: React.FC = () => {
  return (
    <Container>
      <h1>THIS IS TOP PAGE</h1>
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 3rem auto 0;
  width: calc(100% - 2rem);
`;

export default withLayout(Top);
