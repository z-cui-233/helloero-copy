import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';
import CardHelloero from './CardHelloero';

const H2uServices: React.FC = () => {
  return (
    <div>
      <Title>サービス</Title>
      <CardHelloero />
    </div>
  );
};

const Title = styled.div`
  ${typo.Heading3};
`;

export default H2uServices;
