import { PlayerError, PlayerProps } from '@u-next/videoplayer-react';
import { parseCookies } from 'nookies';
import { useCallback, useState } from 'react';
import { PretestWabikenApiResponse } from 'src/pages/api/pretest-wabiken';
import useVariousFetch from '@/shared/hooks/useVariousFetcher';
import { cookieParams } from '@/shared/constants/cookies';

export const PAGE_STATUS = {
  INIT: 'INIT',
  PLAY: 'PLAY',
  ERROR: 'ERROR',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  playerProps: PlayerProps | undefined;
  errorMessage: {
    title: string;
    text: string;
    errorCode: string;
  };
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  playerProps: undefined,
  errorMessage: {
    title: '',
    text: '',
    errorCode: '',
  },
};

export type UsePretestPlayback = {
  playerState: State;
  playbackStart: () => Promise<void>;
};

const usePretestPlayback = (): UsePretestPlayback => {
  const [state, setState] = useState<State>(initialState);
  const { fetcher } = useVariousFetch<PretestWabikenApiResponse>();

  const creatPlayerPropsFromPlayInfo = useCallback(
    (
      playInfo: PretestWabikenApiResponse['data'],
      deviceId: string
    ): PlayerProps => {
      return {
        playbackAuthorization: 'playtoken',
        authorizationToken: playInfo.endpoints[0].extra.playToken,
        endPoints: playInfo.endpoints.map((endpointData) => ({
          displayName: endpointData.displayName,
          playables: endpointData.playables.reduce((result, current) => {
            let appendValue = {};

            if (
              ['dash', 'hls-cmaf', 'hls-fp', 'hls-s-aes'].includes(current.type)
            ) {
              appendValue = {
                [current.type]: current.cdns.map((cdnData) => ({
                  id: cdnData.cdnId,
                  weight: cdnData.weight,
                  licenseUrls:
                    cdnData.licenseUrlList?.reduce(
                      (result2, current2) => {
                        result2[current2.drmType] = current2.endpoint;
                        return result2;
                      },
                      {} as {
                        [key: string]: string;
                      }
                    ) ?? [],
                  manifestUrl: cdnData.playlistUrl,
                })),
              };
            }

            return {
              ...result,
              ...appendValue,
            };
          }, {}),
          sceneSearchLists:
            endpointData.sceneSearchList
              .find((sceneSearchData) => sceneSearchData.type === 'IMS_M')
              ?.cdns.map((sceneSearchData) => ({
                sceneSearchUrl: sceneSearchData.sceneSearchUrl,
              })) ?? [],
        })),
        sessionArgs: {
          type: 'isem',
          isemToken: playInfo.endpoints[0].isem.isemToken,
          baseUrl: playInfo.endpoints[0].isem.endpoint,
          deviceId,
          overwrite: true,
        },
        isRealtime: false,
        onBackClick: () => {
          setState((state) => ({
            ...state,
            pageStatus: PAGE_STATUS.INIT,
          }));
        },
        onError: (error: PlayerError) => {
          const title = error.customTitle ?? '';
          const text = error.customMessage ?? '';
          const errorCode = error.customCode ? String(error.customCode) : '';

          setState((state) => ({
            ...state,
            pageStatus: PAGE_STATUS.ERROR,
            errorMessage: {
              title,
              text,
              errorCode,
            },
          }));
        },
      };
    },
    []
  );

  const playbackStart: UsePretestPlayback['playbackStart'] =
    useCallback(async () => {
      const cookies = parseCookies();
      const userAgent = encodeURIComponent(window.navigator.userAgent);
      const deviceId = encodeURIComponent(cookies[cookieParams.uuid.name]);

      const apiData = await fetcher(
        `/api/pretest-wabiken?uuid=${deviceId}&userAgent=${userAgent}`
      );
      const playerProps = creatPlayerPropsFromPlayInfo(apiData.data, deviceId);

      setState((state) => ({
        ...state,
        pageStatus: playerProps ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        deviceId,
        playerProps,
      }));

      return;
    }, [creatPlayerPropsFromPlayInfo, fetcher]);

  return {
    playerState: state,
    playbackStart,
  };
};

export default usePretestPlayback;
