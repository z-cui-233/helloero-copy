import { PlayerError, PlayerProps } from '@u-next/videoplayer-react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';
import {
  GetPlayInfoQuery,
  GetPlayInfoQueryVariables,
  PlayInfo,
} from '../../API';
import { getPlayInfo } from '../../graphql/queries';
import { DEVICE_CODE } from '@/localShared/constants';
import { cookieParams } from '@/shared/constants/cookies';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { useLocale } from '@/shared/context/LocaleContext';
import { getErrorMessage } from '@/shared/utils';

export const PAGE_STATUS = {
  INIT: 'INIT',
  PLAY: 'PLAY',
  ERROR: 'ERROR',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UsePlayer {
  playerState: {
    pageStatus: PageStatus;
    wabiken: string;
    deviceId: string;
    playerProps: PlayerProps | undefined;
    errorMessage: {
      title: string;
      text: string;
      errorCode: string;
    };
  };
}

const initialState: UsePlayer['playerState'] = {
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

const usePlayer = (): UsePlayer => {
  const router = useRouter();
  const { lang } = useLocale();

  const [playerState, setPlayerState] =
    useState<UsePlayer['playerState']>(initialState);

  const { fetcher } = useAmplifyFetcher<
    GetPlayInfoQuery,
    GetPlayInfoQueryVariables
  >();

  const creatPlayerPropsFromPlayInfo = useCallback(
    (playInfo: PlayInfo, deviceId: string): PlayerProps => {
      return {
        playbackAuthorization: 'playtoken',
        authorizationToken: playInfo.endpoints[0].extra.playToken,
        endPoints: playInfo.endpoints.map((endpointData) => {
          return {
            displayName: 'this is displayName',
            playables: endpointData.playables.reduce((result, current) => {
              if (
                current.type === 'dash' ||
                current.type === 'hls-cmaf' ||
                current.type === 'hls-fp' ||
                current.type === 'hls-s-aes'
              ) {
                return {
                  [current.type]: current.cdns.map((cdnData) => {
                    return {
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
                    };
                  }),
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
          router.back();
        },
        onError: (error: PlayerError) => {
          const title = error.customTitle ?? '';
          const text = error.customMessage ?? '';
          const errorCode = error.customCode ? String(error.customCode) : '';

          setPlayerState((playerState) => ({
            ...playerState,
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
        const errorMessage = getErrorMessage(lang, 'getPlayInfo', errorCode);

        setPlayerState((playerState) => ({
          ...playerState,
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

      setPlayerState((playerState) => ({
        ...playerState,
        pageStatus: playerProps ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        wabiken,
        deviceId,
        playerProps,
      }));
    })();
  }, [creatPlayerPropsFromPlayInfo, fetcher, lang, router.query.wabiken]);

  return {
    playerState,
  };
};

export default usePlayer;
