import React from 'react';
import withAmplifyAuth from 'src/shared/hocs/withAmplifyAuth';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import NoticeMessage from './NoticeMessage';
import usePlayer, { PAGE_STATUS } from './usePlayer';

const Play: React.FC = () => {
  const store = usePlayer();

  console.log(store);

  return (
    <Container>
      {store.playerState.pageStatus === PAGE_STATUS.PLAY && (
        <DummyText>
          <pre>
            <code>
              {JSON.stringify(store.playerState.playInfo, null, '\t')}
            </code>
          </pre>
        </DummyText>
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

const DummyText = styled.div`
  ${typo.Body};
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

export default withAmplifyAuth(Play);
