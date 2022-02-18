import React from 'react';
import usePretestPlayback, { PAGE_STATUS } from './usePretestPlayback';
import Playback from './Playback';
import Confirmation from './Confirmation';

const PretestPlayback: React.FC = () => {
  const { playerState, playbackStart } = usePretestPlayback();

  return playerState.pageStatus === PAGE_STATUS.INIT ? (
    <Confirmation playbackStart={playbackStart} />
  ) : (
    <Playback playerState={playerState} />
  );
};

export default PretestPlayback;
