import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import typo from '@/shared/styles/typo';
import ArrowLogo from '@/shared/assets/icon/arrow_right.svg';
import { useLocale } from '@/shared/context/LocaleContext';

const WabikenMenu: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <Container>
      <div>
        <Link href={`/${locale}/entry`} passHref>
          <StyledLink>
            <div>
              {lang.helloero.myLibrary.wabiken.entry}
              <ArrowLogo />
            </div>
          </StyledLink>
        </Link>
      </div>
      <div>
        <StyledLink
          href="https://www.amazon.co.jp/%E3%82%A2%E3%83%80%E3%83%AB%E3%83%88-DVD/b/ref=amb_link_ZkQehEtaPFKe33Nuo8yX0w_32?ie=UTF8&node=896246&redirect=true&rw_useCurrentProtocol=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div>
            {lang.helloero.myLibrary.wabiken.store}
            <ArrowLogo />
          </div>
        </StyledLink>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
  display: inline-block;
  padding: 0.5rem 1.5rem 0.5rem 0;
  line-height: 1;
  position: relative;
  transition: color 0.3s ease;

  & svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
    width: 0.75rem;
    height: 0.75rem;
    display: block;

    & path {
      transition: fill 0.3s ease;
    }
  }

  &:hover {
    color: ${({ theme }) => theme.keyColor.color1};

    & svg {
      path {
        fill: ${({ theme }) => theme.keyColor.color1};
      }
    }
  }
`;

export default WabikenMenu;
