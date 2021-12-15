import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetPlayInfoQuery, GetPlayInfoQueryVariables } from 'src/API';
import { getPlayInfo } from 'src/graphql/queries';
import { DEVICE_CODE } from 'src/shared/constants';
import useAmplifyFetcher from 'src/shared/hooks/useAmplifyFetcher';
import { GraphQLResultEx } from 'src/types/amplify';

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
    playInfo: GraphQLResultEx<GetPlayInfoQuery> | undefined;
  };
}

const initialState: UsePlayer['playerState'] = {
  pageStatus: PAGE_STATUS.INIT,
  wabiken: '',
  deviceId: '',
  playInfo: undefined,
};

const usePlayer = (): UsePlayer => {
  const router = useRouter();

  const [playerState, setPlayerState] =
    useState<UsePlayer['playerState']>(initialState);

  const { fetcher } = useAmplifyFetcher<
    GetPlayInfoQuery,
    GetPlayInfoQueryVariables
  >();

  useEffect(() => {
    (async () => {
      const wabiken = router.query.wabiken
        ? (router.query.wabiken as string)
        : '';

      const deviceId = encodeURIComponent(window.navigator.userAgent);

      const apiData = await fetcher(getPlayInfo, {
        wabikenId: wabiken,
        deviceCode: DEVICE_CODE,
        deviceId,
      });

      setPlayerState((playerState) => ({
        ...playerState,
        pageStatus: !apiData.errors ? PAGE_STATUS.PLAY : PAGE_STATUS.ERROR,
        wabiken,
        deviceId,
        playInfo: apiData,
      }));
    })();
  }, [fetcher, router.query.wabiken]);

  return {
    playerState,
  };
};

export default usePlayer;
