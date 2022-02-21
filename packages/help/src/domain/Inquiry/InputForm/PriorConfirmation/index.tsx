import React from 'react';
import styled from 'styled-components';
import ArrowTextLink from '@/shared/components/ArrowTextLink';
import typo from '@/shared/styles/typo';

const PriorConfirmation: React.FC = () => (
  <Container>
    <Title>お問い合わせの前に、こちらをご確認ください。</Title>
    <Text>
      <div>
        <ArrowTextLink href="/systemtrouble" text="緊急のお知らせ" />
      </div>
      <div>
        <ArrowTextLink href="/guide" text="よくある質問" />
      </div>
    </Text>
  </Container>
);

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  border-radius: 0.2rem;
  padding: 1.5rem 1rem;
  margin: 2rem 0 0;
`;

const Title = styled.div`
  ${typo.Lead2};
  line-height: 1.4;
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

export default PriorConfirmation;
