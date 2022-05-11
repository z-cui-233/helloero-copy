import { Player as DefaultPlayer } from '@u-next/defaultplayer';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import styled from 'styled-components';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import NoticeMessage from './NoticeMessage';
import usePlayer, { PAGE_STATUS } from './usePlayer';

const Play: React.FC = () => {
  const { playerState } = usePlayer();

  return (
    <Container>
      {playerState.pageStatus === PAGE_STATUS.PLAY &&
        !!playerState.playerProps && (
          <DefaultPlayer {...playerState.playerProps} />
        )}
      {playerState.pageStatus === PAGE_STATUS.ERROR && (
        <NoticeMessage
          title={playerState.errorMessage.title}
          text={playerState.errorMessage.text}
          errorCode={playerState.errorMessage.errorCode}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  height: 100%;
  width: 100%;
  position: relative;
`;

export default withAmplifyAuth(Play, globalConfig);
