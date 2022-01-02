import React from 'react';
import styled from 'styled-components';
import { Config } from 'u-next/config';
import typo from '../../../../../styles/typo';
import ArrowLogo from '../../../../../assets/icon/arrow_right_white.svg';
import { useLoginStateContext } from '../../../../../context/LoginStateContext';
import device from '../../../../../styles/device';
import { useLocale } from '../../../../../context/LocaleContext';

type Props = {
  options: Config;
};

const MenuList: React.FC<Props> = ({ options }) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { lang } = useLocale();
  const backUrl = encodeURIComponent(options.HELLOERO);

  return (
    <Container>
      <React.Fragment>
        <List>
          <li>
            {isLoadedUserInfo && !userInfo.isLoggedIn && (
              <StyledLink href={`${options.ACCOUNT}/login?back=${backUrl}`}>
                {lang.helloero.menus.login}
                <StyledArrowLogo />
              </StyledLink>
            )}
          </li>
          <li>
            <StyledLink href={options.ACCOUNT}>
              {lang.helloero.menus.account}
              <StyledArrowLogo />
            </StyledLink>
          </li>
          <li>
            <StyledLink href={options.HELP}>
              {lang.helloero.menus.help}
              <StyledArrowLogo />
            </StyledLink>
          </li>
        </List>
      </React.Fragment>
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

const List = styled.ul`
  margin: 4rem 0 0;
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
