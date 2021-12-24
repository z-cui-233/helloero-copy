import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';
import CardHelloero from './CardHelloero';
import { useLocale } from '@/shared/context/LocaleContext';

const H2uServices: React.FC = () => {
  const { lang } = useLocale();

  return (
    <div>
      <Title>{lang.account.top.service.title}</Title>
      <CardHelloero />
    </div>
  );
};

const Title = styled.div`
  ${typo.Heading3};
`;

export default H2uServices;
