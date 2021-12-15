import Link from 'next/link';
import React from 'react';
import {
  ErrorCodeGetPlayInfo,
  errorMessages,
} from 'src/shared/constants/errorMessages';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import { UsePlayer } from '../usePlayer';

interface Props {
  playInfo: UsePlayer['playerState']['playInfo'];
}

const NoticeMessage: React.FC<Props> = ({ playInfo }) => {
  const errorCode = playInfo?.errors?.[0]?.errorInfo
    ?.code as ErrorCodeGetPlayInfo;

  const errorMessage =
    errorMessages.getPlayInfo[errorCode] ?? errorMessages.default;

  return (
    <Container>
      <BodyContent>
        <Title>再生できません</Title>
        <Text>
          {errorMessage}
          <br />({errorCode})
        </Text>
        <LinkContainer>
          <Link href={'/'} passHref>
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
