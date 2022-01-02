import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { globalConfig } from 'src/globalConfig';
import typo from '@/shared/styles/typo';

export type Breadcrumbs = {
  path: string;
  text: string;
};

type Props = {
  breadcrumbs: Breadcrumbs[];
};

const BreadcrumbsList: React.FC<Props> = ({ breadcrumbs }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((data, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: data.text,
        item: `${globalConfig.HELP}${data.path}`,
      };
    }),
  };

  return (
    <React.Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <Container>
        {breadcrumbs.map((data) => (
          <Item key={data.path}>
            <Link href={data.path} passHref>
              <StyledLink>{data.text}</StyledLink>
            </Link>
          </Item>
        ))}
      </Container>
    </React.Fragment>
  );
};

const Container = styled.ol`
  display: flex;
  flex-wrap: wrap;
  line-height: 1.4;
`;

const Item = styled.li`
  position: relative;
  margin: 0 1.5rem 0 0;

  &:not(:last-child):after {
    content: '';
    border-top: 1px solid ${({ theme }) => theme.foreground.tertiary};
    border-right: 1px solid ${({ theme }) => theme.foreground.tertiary};
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -0.75rem;
    margin: auto 0;
    transform: rotate(45deg);
  }
`;

const StyledLink = styled.a`
  ${typo.Body};
  text-decoration: none;
  transition: color 0.1s ease-out;
  color: ${({ theme }) => theme.foreground.tertiary};

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.foreground.primary};
  }
`;

export default BreadcrumbsList;
