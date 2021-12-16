import React from 'react';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import styled from 'styled-components';
import { Player as BabyStar } from '@u-next/videoplayer-react';
import NoticeMessage from './NoticeMessage';
import usePlayer, { PAGE_STATUS } from './usePlayer';

const Play: React.FC = () => {
  const store = usePlayer();

  return (
    <Container>
      {store.playerState.pageStatus === PAGE_STATUS.PLAY &&
        !!store.playerState.playerProps && (
          <BabyStar {...store.playerState.playerProps} />
        )}
      {store.playerState.pageStatus === PAGE_STATUS.ERROR && (
        <NoticeMessage
          title={store.playerState.errorMessage.title}
          text={store.playerState.errorMessage.text}
          errorCode={store.playerState.errorMessage.errorCode}
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

export default withAmplifyAuth(Play);
