import { PlayerError, PlayerProps } from '@u-next/defaultplayer';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
import { DEVICE_CODE } from '@/localShared/constants';
import { cookieParams } from '@/shared/constants/cookies';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { getErrorMessage } from '@/shared/utils';
import {
  GetPlayInfoQuery,
  GetPlayInfoQueryVariables,
  GetWabikenMetaQuery,
  GetWabikenMetaQueryVariables,
  PlayInfo,
} from '../../API';
import { getPlayInfo, getWabikenMeta } from '../../graphql/queries';

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
  const [state, setState] = React.useState<State>(initialState);

  const { fetcher: getWabikenMetaQueryFetcher } = useAmplifyFetcher<
    GetWabikenMetaQuery,
    GetWabikenMetaQueryVariables
  >();

  const { fetcher: getPlayInfoQueryFetcher } = useAmplifyFetcher<
    GetPlayInfoQuery,
    GetPlayInfoQueryVariables
  >();

  const creatPlayerPropsFromPlayInfo = React.useCallback(
    (props: {
      playInfo: PlayInfo;
      deviceId: string;
      titleName: string;
    }): PlayerProps => ({
      playbackAuthorization: 'playtoken',
      authorizationToken: props.playInfo.endpoints[0].extra.playToken,
      endPoints: props.playInfo.endpoints.map((endpointData) => ({
        title: props.titleName,
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
      sessionArgs: {
        type: 'isem',
        isemToken: props.playInfo.endpoints[0].isem.isemToken,
        baseUrl: props.playInfo.endpoints[0].isem.endpoint,
        deviceId: props.deviceId,
        overwrite: true,
      },
      isRealtime: false,
      autoplay: true,
      onClose: () => {
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
      theme: {
        keyColor: 'rgba(230, 0, 50, 1)',
      },
      isInline: false,
    }),
    [router]
  );

  React.useEffect(() => {
    (async () => {
      const wabiken = router.query.wabiken
        ? (router.query.wabiken as string)
        : '';

      const cookies = parseCookies();
      const deviceId = encodeURIComponent(cookies[cookieParams.uuid.name]);

      const [getWabikenMetaApiData, getPlayInfoApiData] = await Promise.all([
        getWabikenMetaQueryFetcher(getWabikenMeta, {
          id: wabiken,
        }),
        getPlayInfoQueryFetcher(getPlayInfo, {
          wabikenId: wabiken,
          deviceCode: DEVICE_CODE,
          deviceId,
        }),
      ]);

      if (getPlayInfoApiData.errors) {
        const errorCode = getPlayInfoApiData.errors?.[0]?.errorInfo?.code;
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
        getPlayInfoApiData.data?.getPlayInfo?.playInfo &&
        creatPlayerPropsFromPlayInfo({
          playInfo: getPlayInfoApiData.data.getPlayInfo.playInfo as PlayInfo,
          deviceId,
          titleName:
            getWabikenMetaApiData.data?.getWabikenMeta?.wabiken.content
              .displayName ?? '',
        });

      setState((state) => ({
        ...state,
        pageStatus: playerProps ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        wabiken,
        deviceId,
        playerProps,
      }));
    })();
  }, [
    creatPlayerPropsFromPlayInfo,
    getPlayInfoQueryFetcher,
    getWabikenMetaQueryFetcher,
    router.query.wabiken,
  ]);

  return {
    playerState: state,
  };
};

export default usePlayer;
