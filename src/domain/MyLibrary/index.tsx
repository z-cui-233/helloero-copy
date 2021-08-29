import React from 'react';
import withLayout from 'src/shared/components/Layout';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const MyLibrary: React.FC = () => {
  const { userInfo } = useLoginStateContext();

  return (
    <Container>
      <Title>MY LIBRARY</Title>
      <Contents>
        <div>
          ログイン状態: {userInfo.isLoggedIn ? 'Logged in' : 'Not Logged in'}
        </div>
        <div>username: {userInfo.userInfo?.username}</div>
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

export default withLayout(withAmplifyAuth(MyLibrary));
