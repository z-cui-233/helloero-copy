import { PlayerError, PlayerProps } from '@u-next/defaultplayer';
import { parseCookies } from 'nookies';
import React from 'react';
import { PretestWabikenApiResponse } from 'src/pages/api/pretest-wabiken';
import { cookieParams } from '@/shared/constants/cookies';
import useVariousFetch from '@/shared/hooks/useVariousFetcher';

export const PAGE_STATUS = {
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
  pageStatus: PAGE_STATUS.PLAY,
  playerProps: undefined,
  errorMessage: {
    title: '',
    text: '',
    errorCode: '',
  },
};

export type UsePretestPlayback = {
  playerState: State;
};

const usePretestPlayback = (): UsePretestPlayback => {
  const [state, setState] = React.useState<State>(initialState);
  const { fetcher } = useVariousFetch<PretestWabikenApiResponse>();

  const creatPlayerPropsFromPlayInfo = React.useCallback(
    (props: {
      playInfo: PretestWabikenApiResponse['data'];
      deviceId: string;
    }): PlayerProps => {
      return {
        playbackAuthorization: 'playtoken',
        authorizationToken: props.playInfo.endpoints[0].extra.playToken,
        endPoints: props.playInfo.endpoints.map((endpointData) => ({
          title: 'テスト動画',
          playables: endpointData.playables.reduce((result, current) => {
            const appendValue = [
              'dash',
              'hls-cmaf',
              'hls-fp',
              'hls-s-aes',
            ].includes(current.type)
              ? {
                  [current.type]: current.cdns.map((cdnData) => ({
                    id: cdnData.cdnId,
                    weight: cdnData.weight,
                    licenseUrls:
                      cdnData.licenseUrlList?.reduce(
                        (result2, current2) => ({
                          ...result2,
                          ...{ [current2.drmType]: current2.endpoint },
                        }),
                        {}
                      ) ?? [],
                    manifestUrl: cdnData.playlistUrl,
                  })),
                }
              : {};

            return {
              ...result,
              ...appendValue,
            };
          }, {}),
          sceneSearchList: endpointData.sceneSearchList.reduce(
            (result, current) => ({
              ...result,
              ...{ [current.type]: current.cdns[0].sceneSearchUrl },
            }),
            {}
          ),
        })),
        sessionArgs: props.playInfo.endpoints[0].isem
          ? {
              type: 'isem',
              isemToken: props.playInfo.endpoints[0].isem.isemToken,
              baseUrl: props.playInfo.endpoints[0].isem.endpoint,
              deviceId: props.deviceId,
              overwrite: true,
            }
          : undefined,
        isRealtime: false,
        autoplay: false,
        onClose: () => {
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
        theme: {
          keyColor: 'rgba(230, 0, 50, 1)',
        },
        isInline: true,
      };
    },
    []
  );

  React.useEffect(() => {
    (async () => {
      const cookies = parseCookies();
      const userAgent = encodeURIComponent(window.navigator.userAgent);
      const deviceId = encodeURIComponent(cookies[cookieParams.uuid.name]);

      const apiData = await fetcher(
        `/api/pretest-wabiken?uuid=${deviceId}&userAgent=${userAgent}`
      );

      const playerProps = creatPlayerPropsFromPlayInfo({
        playInfo: apiData.data,
        deviceId,
      });

      setState((state) => ({
        ...state,
        pageStatus: playerProps ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        deviceId,
        playerProps,
      }));
    })();
  }, [creatPlayerPropsFromPlayInfo, fetcher]);

  return {
    playerState: state,
  };
};

export default usePretestPlayback;
