import React from 'react';
import withLayout from 'src/shared/components/Layout';
import { useUserInfoContext } from 'src/shared/context/UserInfoContext';
import withAuth from 'src/shared/hocs/withAuth';
import styled from 'styled-components';

const TestMyPage: React.FC = () => {
  const { userInfo } = useUserInfoContext();

  return (
    <Container>
      <h1>THIS IS TestMyPage</h1>
      <div>name : {userInfo.name}</div>
      <div>email : {userInfo.email}</div>
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

export default withLayout(withAuth(TestMyPage));
