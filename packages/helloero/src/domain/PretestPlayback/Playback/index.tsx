import { Player as DefaultPlayer } from '@u-next/defaultplayer';
import React from 'react';
import styled from 'styled-components';
import { PAGE_STATUS, UsePretestPlayback } from '../usePretestPlayback';
import NoticeMessage from './NoticeMessage';

type Props = {
  playerState: UsePretestPlayback['playerState'];
};

const Playback: React.FC<Props> = ({ playerState }) => (
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

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primaryInverted};
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export default Playback;
