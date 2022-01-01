import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import { useLocale } from '@/shared/context/LocaleContext';
import typo from '@/shared/styles/typo';
import ListRightArrow from '@/shared/components/ListRightArrow';

const SiteMenus: React.FC = () => {
  const { lang } = useLocale();

  return (
    <Container>
      <Title>{lang.account.top.siteMenus.title}</Title>
      <List>
        <div>
          <Link href={`${globalConfig.HELLOERO}/`} passHref>
            <StyledLink>
              {lang.account.top.siteMenus.helloero}
              <ListRightArrow />
            </StyledLink>
          </Link>
        </div>
        <div>
          <Link href={`${globalConfig.HELP}/`} passHref>
            <StyledLink>
              {lang.account.top.siteMenus.help}
              <ListRightArrow />
            </StyledLink>
          </Link>
        </div>
      </List>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.background.tertiary};
  margin: 3rem 0 0;
`;

const Title = styled.div`
  ${typo.Heading3};
  margin: 1.5rem 1.5rem 0;
`;

const List = styled.div`
  margin: 1.5rem 0 0 1.5rem;
`;

const StyledLink = styled.a`
  border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  padding: 1rem 2.5rem 1rem 1rem;
  display: block;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

export default SiteMenus;
