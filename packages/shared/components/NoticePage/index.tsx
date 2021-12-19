import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';
import MainContainer from '../../components/parts/MainContainer';

interface Props {
  title: string;
  texts: string | string[];
  links: { href: string; label: string }[];
}

const NoticePage: React.FC<Props> = ({ title, texts, links }) => {
  return (
    <MainContainer>
      <Title>{title}</Title>
      <Text>
        {texts instanceof Array ? (
          <div>
            {texts.map((val) => (
              <div key={val}>{val}</div>
            ))}
          </div>
        ) : (
          <div>{texts}</div>
        )}
      </Text>
      <LinkContainer>
        {links.map(({ href, label }) => (
          <div key={href}>
            <Link href={href} passHref>
              <StyledLink>{label}</StyledLink>
            </Link>
          </div>
        ))}
      </LinkContainer>
    </MainContainer>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  margin: 1.5rem 0 0;
`;

const LinkContainer = styled.div`
  margin: 2rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
  text-decoration: underline;
  display: inline-block;
  padding: 0.5rem 0;
`;

export default NoticePage;
