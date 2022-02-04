import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';
import MainContainer from '../../components/parts/MainContainer';

type Props = {
  title?: string;
  texts?: string | string[];
  links: { href: string; label: string }[];
};

const NoticePage: React.FC<Props> = ({ title, texts, links }) => {
  return (
    <MainContainer>
      {title && <Title>{title}</Title>}
      {texts && (
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
      )}
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
  ${typo.Heading3};
`;

const Text = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  margin: 1.5rem 0 0;
`;

const LinkContainer = styled.div`
  margin: 2rem 0 0;

  & > div + div {
    margin: 1rem 0 0;
  }
`;

const StyledLink = styled.a`
  ${typo.Body}
  background-color: ${({ theme }) => theme.keyColor.color4};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-decoration: none;
  min-width: 10rem;
  border-radius: 0.2rem;

  &:hover {
    text-decoration: none;
  }
`;

export default NoticePage;
