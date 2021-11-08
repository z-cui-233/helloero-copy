import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Landing: React.FC = () => {
  return (
    <Container>
      <Link href="/login" passHref>
        <a>利用する</a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

export default Landing;
