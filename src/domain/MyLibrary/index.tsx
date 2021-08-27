import React from 'react';
import withLayout from 'src/shared/components/Layout';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';

const MyLibrary: React.FC = () => {
  const { userInfo } = useLoginStateContext();

  return (
    <Container>
      <h1>THIS IS MyLibrary</h1>
      <div>
        ログイン状態: {userInfo.isLoggedIn ? 'Logged in' : 'Not Logged in'}
      </div>
      <div>username: {userInfo.userInfo?.username}</div>
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

export default withLayout(withAmplifyAuth(MyLibrary));
