import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ListRightArrow from '@/shared/components/ListRightArrow';
import typo from '@/shared/styles/typo';

export type LinkListItemData = {
  url: string;
  preTitle?: string;
  title: string;
};

type Props = {
  title?: string;
  data: LinkListItemData[];
};

const LinkList: React.FC<Props> = ({ title, data }) => (
  <Container>
    {title && <SectionTitle>{title}</SectionTitle>}
    <ul>
      {data.map(({ url, preTitle, title }) => (
        <ListItem key={url}>
          <Link href={url} passHref>
            <StyledLink>
              <div>
                <PreTitle>{preTitle}</PreTitle>
                <Title>{title}</Title>
              </div>
              <ListRightArrow />
            </StyledLink>
          </Link>
        </ListItem>
      ))}
    </ul>
  </Container>
);

const Container = styled.div`
  margin: 3rem 0 0;
`;

const SectionTitle = styled.div`
  ${typo.Lead1};
  padding: 0 0 0 1rem;
  margin: 0 0 1rem;
`;

const ListItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.background.tertiary};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.background.tertiary};
  }
`;

const StyledLink = styled.a`
  display: block;
  padding: 1rem 2.5rem 1rem 1rem;
  text-decoration: none;
  transition: background-color 0.1s ease-out;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
    text-decoration: none;
  }
`;

const PreTitle = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 0 0 0.25rem;
`;

const Title = styled.h2`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
`;

export default LinkList;
