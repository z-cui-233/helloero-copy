import React from 'react';
import styled from 'styled-components';
import typo from 'src/shared/styles/typo';
import ArrowLogo from '../../../../../assets/icon/arrow_right_white.svg';
import Link from 'next/link';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';

const MenuList: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <React.Fragment>
      <Section>
        <Title>設定</Title>
        <List>
          {isLoadedUserInfo && (
            <React.Fragment>
              {!userInfo.isLoggedIn && (
                <ListItem>
                  <Link href="/login" passHref>
                    <StyledLink>
                      ログイン
                      <StyledArrowLogo />
                    </StyledLink>
                  </Link>
                </ListItem>
              )}
              {userInfo.isLoggedIn && (
                <ListItem>
                  <Link href="/logout" passHref>
                    <StyledLink>
                      ログアウト
                      <StyledArrowLogo />
                    </StyledLink>
                  </Link>
                </ListItem>
              )}
            </React.Fragment>
          )}
        </List>
      </Section>
      <Section>
        <Title>ヘルプ</Title>
        <List>
          <ListItem>
            <StyledLink
              href="https://video.unext.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              利用規約
              <StyledArrowLogo />
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              href="https://video.unext.jp"
              target="_blank"
              rel="noopener noreferrer"
            >
              お問い合わせ
              <StyledArrowLogo />
            </StyledLink>
          </ListItem>
        </List>
      </Section>
    </React.Fragment>
  );
};

const Section = styled.div`
  margin: 4rem 0 0;
`;

const Title = styled.div`
  ${typo.Heading1};
  color: ${({ theme }) => theme.text.primaryInverted};
`;

const List = styled.ul`
  margin: 1.5rem 0 0;
`;

const ListItem = styled.li`
  margin: 1rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Heading2};
  font-weight: bold;
  color: ${({ theme }) => theme.text.primaryInverted};
  position: relative;
  display: block;
  text-decoration: none;
  transition: color 0.3s ease;

  & svg path {
    transition: fill 0.3s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    text-decoration: underline;

    & svg path {
      fill: ${({ theme }) => theme.text.primary};
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
