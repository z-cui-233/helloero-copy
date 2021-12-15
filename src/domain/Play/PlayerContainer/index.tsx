import React from 'react';
import { PlayInfo } from 'src/API';
import {
  Player as BabyStar,
  PlayerProps,
  // PlayerError,
} from '@u-next/videoplayer-react';
import { IntlProvider } from 'react-intl';

interface Props {
  deviceId: string;
  playInfo: PlayInfo;
}

const messages = {
  attention: '注意',
  dub: '吹',
  keyboardShortcut: 'キーボードショートカット',
  'live.kana': 'ライブ配信',
  'mediaOverlay.backToViewer': '最後のページに戻る',
  'mediaOverlay.replay': 'もう一度観る',
  'music.kana': 'ミュージック',
  'playcard.video.isplayingcamera': '視聴中',
  'player.cameras': 'カメラ切替',
  'player.episodes': 'エピソード',
  'player.setting': '設定',
  'setting.bitrate': '画質',
  'setting.bitrateAuto': '自動',
  'setting.bitrateHigh': '高画質',
  'setting.bitrateLow': '低画質',
  'setting.dub': '吹替',
  'setting.playbackRate': '再生速度',
  'setting.sub': '字幕',
  'setting.subDub': '字幕・吹替',
  'shortcut.common.cancelFullscreen': 'フルスクリーンを解除',
  'shortcut.common.fullscreen': 'フルスクリーンの切り替え',
  'shortcut.common.showShortcut': 'ショートカットを表示',
  'shortcut.video.decreasePlayRate': '再生速度を減少',
  'shortcut.video.forward10': '10秒進む',
  'shortcut.video.forward30': '30秒進む',
  'shortcut.video.increasePlayRate': '再生速度を増加',
  'shortcut.video.lowerVolume': '音量を下げる',
  'shortcut.video.mute': '音量をミュート',
  'shortcut.video.pictureInPicture': 'ミニプレイヤーで再生',
  'shortcut.video.playPause': '再生 / 一時停止の切り替え',
  'shortcut.video.raiseVolume': '音量を上げる',
  'shortcut.video.rewind10': '10秒戻る',
  'shortcut.video.rewind30': '30秒戻る',
  sub: '字',
  subdub: '字・吹',
  'video.kana': 'ビデオ',
} as const;

const PlayerContainer: React.FC<Props> = ({ deviceId, playInfo }) => {
  const playerProps: PlayerProps = {
    playbackAuthorization: 'playtoken',
    authorizationToken: playInfo.endpoints[0].extra.playToken,
    endPoints: playInfo.endpoints,
    sessionArgs: {
      type: 'isem',
      isemToken: playInfo.endpoints[0].isem.isemToken,
      baseUrl: playInfo.endpoints[0].isem.endpoint,
      deviceId,
      overwrite: true,
    },
    isRealtime: false,
    onBackClick: () => {
      // eslint-disable-next-line no-console
      console.log('onBackClick');
      return;
    },
    onError: () => {
      // eslint-disable-next-line no-console
      console.log('onError');
      return;
    },
  };

  console.log(playInfo, playerProps);
  console.log(JSON.stringify(playInfo));
  console.log(JSON.stringify(playerProps));

  return (
    <IntlProvider locale="ja-JP" messages={messages}>
      <BabyStar {...playerProps} />
    </IntlProvider>
  );
};

export default PlayerContainer;
