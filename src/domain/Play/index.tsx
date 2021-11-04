import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const Play: React.FC = () => {
  return (
    <Container>
      <DummyText>
        <div>THIS IS PLAYER</div>
      </DummyText>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.text.primaryInverted};
  height: 100%;
  width: 100%;
  position: relative;
`;

const DummyText = styled.div`
  ${typo.Heading3}
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Play;
