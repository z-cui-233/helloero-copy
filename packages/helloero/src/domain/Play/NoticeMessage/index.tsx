import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';

type Props = {
  title: string;
  text: string;
  errorCode: string;
};

const NoticeMessage: React.FC<Props> = ({ title, text, errorCode }) => {
  const { locale, lang } = useLocale();

  return (
    <Container>
      <BodyContent>
        <Title>{title ? title : '再生できません'}</Title>
        <Text>
          {text ? text : lang.messages.default}
          {errorCode && <div>({errorCode})</div>}
        </Text>
        <LinkContainer>
          <Link href={`/${locale}`} passHref>
            <StyledLink>ホーム</StyledLink>
          </Link>
        </LinkContainer>
      </BodyContent>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyContent = styled.div`
  max-width: 640px;
  width: calc(100% - 2rem);
`;

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  ${typo.Standard};
  margin: 1.5rem 0 0;
`;

const LinkContainer = styled.div`
  margin: 2rem 0 0;
`;

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  font-weight: bold;
  text-decoration: underline;
  display: inline-block;
  padding: 0.5rem 0;
`;

export default NoticeMessage;
