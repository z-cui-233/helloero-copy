import React from 'react';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import TitleCard from './TitleCard';

const TitleList: React.FC = () => {
  return (
    <Container>
      <List>
        {[...Array(30)].map((_, i) => (
          <TitleCard key={i} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin: 1.5rem 0 0;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1.5rem 0.75rem;

  @media ${device.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;

export default TitleList;
