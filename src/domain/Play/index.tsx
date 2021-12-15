import React from 'react';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';
import NoticeMessage from './NoticeMessage';
import PlayerContainer from './PlayerContainer';
import usePlayer, { PAGE_STATUS } from './usePlayer';

const Play: React.FC = () => {
  const store = usePlayer();

  return (
    <Container>
      {store.playerState.pageStatus === PAGE_STATUS.PLAY &&
        !!store.playerState.playInfo?.data?.getPlayInfo?.playInfo && (
          <PlayerContainer
            deviceId={store.playerState.deviceId}
            playInfo={store.playerState.playInfo.data.getPlayInfo.playInfo}
          />
        )}
      {store.playerState.pageStatus === PAGE_STATUS.ERROR && (
        <NoticeMessage playInfo={store.playerState.playInfo} />
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

export default withAmplifyAuth(Play);
