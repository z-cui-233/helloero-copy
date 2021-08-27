import Link from 'next/link';
import React from 'react';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import styled from 'styled-components';

const Header: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <Container>
      <Link href="/" passHref>
        <TopLink>Header</TopLink>
      </Link>
      {isLoadedUserInfo && (
        <Menus>
          {!userInfo.isLoggedIn && (
            <div>
              <Link href="/login" passHref>
                <MenuLink>Login</MenuLink>
              </Link>
            </div>
          )}
          {userInfo.isLoggedIn && (
            <div>
              <Link href="/logout" passHref>
                <LogoutLink>Logout</LogoutLink>
              </Link>
            </div>
          )}
        </Menus>
      )}
    </Container>
  );
};

const Container = styled.header`
  height: 4rem;
  width: 100%;
  background-color: #3f72af;
  position: relative;
`;

const TopLink = styled.a`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1rem;
  height: 2rem;
  width: 80px;
  margin: auto 0;
  text-decoration: none;
  color: ${({ theme }) => theme.text.primaryInverted};
  text-align: center;
  line-height: 2rem;

  &:hover {
    text-decoration: none;
  }
`;

const Menus = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  height: 2rem;
  margin: auto 0;
`;

const MenuLink = styled.a`
  display: block;
  height: 2rem;
  padding: 0 0.5rem;
  line-height: 2rem;
  background-color: #dbe2ef;
  color: ${({ theme }) => theme.text.primary};
  font-weight: bold;
`;

const LogoutLink = styled.a`
  display: block;
  height: 2rem;
  padding: 0 0.5rem;
  line-height: 2rem;
  background-color: #dbe2ef;
  color: ${({ theme }) => theme.color.warning};
  font-weight: bold;
`;

export default Header;
