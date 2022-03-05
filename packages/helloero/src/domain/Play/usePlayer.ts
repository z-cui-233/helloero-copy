import { PlayerError, PlayerProps } from '@u-next/videoplayer-react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import { DEVICE_CODE } from '@/localShared/constants';
import { cookieParams } from '@/shared/constants/cookies';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { getErrorMessage } from '@/shared/utils';
import { getPlayInfo } from '../../graphql/queries';
import {
  GetPlayInfoQuery,
  GetPlayInfoQueryVariables,
  PlayInfo,
} from '../../API';

export const PAGE_STATUS = {
  INIT: 'INIT',
  PLAY: 'PLAY',
  ERROR: 'ERROR',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  wabiken: string;
  deviceId: string;
  playerProps: PlayerProps | undefined;
  errorMessage: {
    title: string;
    text: string;
    errorCode: string;
  };
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  wabiken: '',
  deviceId: '',
  playerProps: undefined,
  errorMessage: {
    title: '',
    text: '',
    errorCode: '',
  },
};

export type UsePlayer = {
  playerState: State;
};

const usePlayer = (): UsePlayer => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);
  const { fetcher } = useAmplifyFetcher<
    GetPlayInfoQuery,
    GetPlayInfoQueryVariables
  >();

  const creatPlayerPropsFromPlayInfo = useCallback(
    (playInfo: PlayInfo, deviceId: string): PlayerProps => {
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
          router.back();
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
    [router]
  );

  useEffect(() => {
    (async () => {
      const wabiken = router.query.wabiken
        ? (router.query.wabiken as string)
        : '';

      const cookies = parseCookies();
      const deviceId = encodeURIComponent(cookies[cookieParams.uuid.name]);
      const apiData = await fetcher(getPlayInfo, {
        wabikenId: wabiken,
        deviceCode: DEVICE_CODE,
        deviceId,
      });

      if (apiData.errors) {
        const errorCode = apiData.errors?.[0]?.errorInfo?.code;
        const errorMessage = getErrorMessage('getPlayInfo', errorCode);

        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.ERROR,
          errorMessage: {
            title: '再生できません',
            text: errorMessage,
            errorCode: errorCode ? String(errorCode) : '',
          },
        }));
        return;
      }

      const playerProps =
        apiData.data?.getPlayInfo?.playInfo &&
        creatPlayerPropsFromPlayInfo(
          apiData.data.getPlayInfo.playInfo as PlayInfo,
          deviceId
        );

      setState((state) => ({
        ...state,
        pageStatus: playerProps ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        wabiken,
        deviceId,
        playerProps,
      }));
    })();
  }, [creatPlayerPropsFromPlayInfo, fetcher, router.query.wabiken]);

  return {
    playerState: state,
  };
};

export default usePlayer;
