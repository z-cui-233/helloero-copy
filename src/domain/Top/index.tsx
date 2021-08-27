import React from 'react';
import Link from 'next/link';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';

const Top: React.FC = () => {
  return (
    <Container>
      <h1>THIS IS TOP</h1>
      <div>
        <Link href="/my-library" passHref>
          <a>my-library</a>
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 3rem auto 0;
  width: calc(100% - 2rem);
  background-color: #dbe2ef;
  padding: 1rem;
`;

export default withLayout(Top);
