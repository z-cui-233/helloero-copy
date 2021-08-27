import React from 'react';
import Link from 'next/link';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';
import typo from 'src/shared/styles/typo';

const Top: React.FC = () => {
  return (
    <Container>
      <Title>TOP</Title>
      <Contents>
        <Link href="/my-library" passHref>
          <a>my-library</a>
        </Link>
      </Contents>
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

const Title = styled.div`
  ${typo.Heading3};
  color: ${({ theme }) => theme.text.primary};
  line-height: 1.4;
`;

const Contents = styled.div`
  margin: 2rem 0 0;
`;

export default withLayout(Top);
