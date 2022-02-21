import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

export type DefinitionListItem = {
  title: string;
  textsChildren: React.ReactNode;
};

type Props = {
  data: DefinitionListItem[];
};

const DefinitionListCard: React.FC<Props> = ({ data }) => (
  <Container>
    {data.map(({ title, textsChildren }) => (
      <Section key={title}>
        <Title>{title}</Title>
        <Texts>{textsChildren}</Texts>
      </Section>
    ))}
  </Container>
);

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  border-radius: 0.2rem;
  padding: 1.5rem 1rem;
  margin: 1rem 0 0;
`;

const Section = styled.div`
  &:not(:first-child) {
    margin: 1.5rem 0 0;
  }
`;

const Title = styled.div`
  ${typo.Body};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: bold;
`;

const Texts = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.secondary};
  margin: 0.5rem 0 0;
`;

export default DefinitionListCard;
