import React from 'react';
import { PlayInfo } from 'src/API';
import { Player as BabyStar, PlayerProps } from '@u-next/videoplayer-react';

interface Props {
  deviceId: string;
  playInfo: PlayInfo;
}

const PlayerContainer: React.FC<Props> = ({ deviceId, playInfo }) => {
  const playerProps: PlayerProps = {
    playbackAuthorization: 'playtoken',
    authorizationToken: playInfo.endpoints[0].extra.playToken,
    endPoints: playInfo.endpoints.map((endpointData) => {
      return {
        displayName: '',
        playables: endpointData.playables.reduce((result, current) => {
          if (
            current.type === 'dash' ||
            current.type === 'hls-cmaf' ||
            current.type === 'hls-fp' ||
            current.type === 'hls-s-aes'
          ) {
            return {
              [current.type]: {
                licenseUrls:
                  current.cdns[0].licenseUrlList?.reduce(
                    (result2, current2) => {
                      result2[current2.drmType] = current2.endpoint;
                      return result2;
                    },
                    {} as {
                      [key: string]: string;
                    }
                  ) ?? [],
                manifestUrl: current.cdns[0].playlistUrl,
              },
            };
          }

          return result;
        }, {}),
        sceneSearchLists:
          endpointData.sceneSearchList
            .find((sceneSearchData) => sceneSearchData.type === 'IMS_M')
            ?.cdns.map((sceneSearchData) => {
              return {
                sceneSearchUrl: sceneSearchData.sceneSearchUrl,
              };
            }) ?? [],
      };
    }),
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

  // eslint-disable-next-line no-console
  console.log(playInfo, playerProps);

  return <BabyStar {...playerProps} />;
};

export default PlayerContainer;
