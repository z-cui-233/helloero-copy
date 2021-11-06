import Link from 'next/link';
import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  title: string;
  texts: string[];
  links: { href: string; label: string }[];
}

const NoticePage: React.FC<Props> = ({ title, texts, links }) => {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Text>
        {texts.map((val) => (
          <div key={val}>{val}</div>
        ))}
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
    </React.Fragment>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.text.standard};
  margin: 1.5rem 0 0;
`;

const LinkContainer = styled.div`
  margin: 2rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.text.standard};
  font-weight: bold;
  text-decoration: underline;
  display: inline-block;
  padding: 0.5rem 0;
`;

export default NoticePage;
