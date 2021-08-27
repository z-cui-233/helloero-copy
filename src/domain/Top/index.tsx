import React from 'react';
import Link from 'next/link';
import withLayout from 'src/shared/components/Layout';
import styled from 'styled-components';
import { useSession } from 'next-auth/client';

const Top: React.FC = () => {
  const [session, loading] = useSession();

  console.log({ session, loading });
  return (
    <Container>
      <h1>THIS IS TOP PAGE</h1>
      <Link href="/test-mypage" passHref>
        <a>test-mypage</a>
      </Link>
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
