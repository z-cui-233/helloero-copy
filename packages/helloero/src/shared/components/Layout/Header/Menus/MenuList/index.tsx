import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import typo from '../../../../../../shared/styles/typo';
import ArrowLogo from '../../../../../../shared/assets/icon/arrow_right_white.svg';
import { useLoginStateContext } from '../../../../../../shared/context/LoginStateContext';
import device from '../../../../../../shared/styles/device';

const MenuList: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <Container>
      <React.Fragment>
        <Title>設定</Title>
        <List>
          <li>
            {isLoadedUserInfo && !userInfo.isLoggedIn && (
              <Link href="/login" passHref>
                <StyledLink>
                  ログイン
                  <StyledArrowLogo />
                </StyledLink>
              </Link>
            )}
            {isLoadedUserInfo && userInfo.isLoggedIn && (
              <Link href="/logout" passHref>
                <StyledLink>
                  ログアウト
                  <StyledArrowLogo />
                </StyledLink>
              </Link>
            )}
          </li>
        </List>
      </React.Fragment>
      <Title>ヘルプ</Title>
      <List>
        <li>
          <StyledLink
            href="https://video.unext.jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            利用規約
            <StyledArrowLogo />
          </StyledLink>
        </li>
        <li>
          <StyledLink
            href="https://video.unext.jp"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
            <StyledArrowLogo />
          </StyledLink>
        </li>
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding: 4rem 2rem 0;
  max-width: 800px;

  @media ${device.ltSd} {
    max-width: 100%;
  }
`;

const Title = styled.div`
  ${typo.Heading1};
  margin: 4rem 0 0;
  color: ${({ theme }) => theme.foreground.primaryInverted};
`;

const List = styled.ul`
  margin: 1rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Heading2};
  font-weight: bold;
  color: ${({ theme }) => theme.foreground.primaryInverted};
  position: relative;
  display: block;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;

  & svg path {
    transition: fill 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};
    text-decoration: underline;

    & svg path {
      fill: ${({ theme }) => theme.foreground.primary};
    }
  }
`;

const StyledArrowLogo = styled(ArrowLogo)`
  &&& {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
    height: auto;
    width: 1.5rem;
    display: block;
  }
`;

export default MenuList;
