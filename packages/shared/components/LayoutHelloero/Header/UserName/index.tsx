import React from 'react';
import styled from 'styled-components';
import { useLoginStateContext } from '../../../../context/LoginStateContext';
import typo from '../../../../styles/typo';

const UserName: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return isLoadedUserInfo && userInfo.isLoggedIn ? (
    <Container>
      <Text>{userInfo.userName}</Text>
    </Container>
  ) : null;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  bottom: 0;
  margin: auto;
  height: 2.5rem;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 8rem;
`;

const Text = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default UserName;
