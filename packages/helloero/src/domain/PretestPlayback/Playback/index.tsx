import { Player as BabyStar } from '@u-next/videoplayer-react';
import styled from 'styled-components';
import React from 'react';
import { PAGE_STATUS, UsePretestPlayback } from '../usePretestPlayback';
import NoticeMessage from './NoticeMessage';

type Props = {
  playerState: UsePretestPlayback['playerState'];
};

const Playback: React.FC<Props> = ({ playerState }) => (
  <Container>
    {playerState.pageStatus === PAGE_STATUS.PLAY &&
      !!playerState.playerProps && <BabyStar {...playerState.playerProps} />}
    {playerState.pageStatus === PAGE_STATUS.ERROR && (
      <NoticeMessage
        title={playerState.errorMessage.title}
        text={playerState.errorMessage.text}
        errorCode={playerState.errorMessage.errorCode}
      />
    )}
  </Container>
);

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primaryInverted};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  height: 100%;
  width: 100%;
  position: relative;
`;

export default Playback;
