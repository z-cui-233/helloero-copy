import { NextApiHandler } from 'next';
import { ApiResponse } from 'u-next/api';
import { PlayInfoWabitResponse } from 'u-next/wabit';
import { globalConfig } from 'src/globalConfig';
import { GetPlayInfoQuery } from 'src/API';
import { DEVICE_CODE } from '@/localShared/constants';

type NestedOmit<T, K extends keyof T> = {
  [P in keyof Omit<T, K>]: T[P] extends Array<infer R>
    ? K extends keyof R
      ? Array<NestedOmit<R, K>>
      : Array<R>
    : K extends keyof T[P]
    ? NestedOmit<T[P], K>
    : T[P];
};

type GetPlayInfo = NonNullable<GetPlayInfoQuery['getPlayInfo']>['playInfo'];

export interface PretestWabikenApiResponse extends ApiResponse {
  data: NestedOmit<GetPlayInfo, '__typename'>;
}

const fetchPlayInfoFromWabitApi = (args: {
  userAgent: string;
  uuid: string;
}): Promise<PlayInfoWabitResponse> => {
  if (!args.uuid) {
    throw new Error('uuid does not exists');
  }

  const url = `${process.env.wabitUrl}/v2/playinfo/${globalConfig.PRETEST_WABIKEN}?device_code=${DEVICE_CODE}&device_id=${args.uuid}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': args.userAgent,
    },
  };

  return fetch(url, options).then((response) => response.json());
};

const mapPlayableCdn = (
  cdn: PlayInfoWabitResponse['playinfo']['endpoints'][0]['playables']['dash'][0]
) => ({
  cdnId: null,
  weight: cdn.weight,
  playlistUrl: cdn.playlist_url,
  licenseUrlList: Object.entries(cdn.license_url_list).map(([key, value]) => ({
    drmType: key,
    version: value.version,
    endpoint: value.endpoint,
  })),
});

const mapPlayables = (
  playables: PlayInfoWabitResponse['playinfo']['endpoints'][0]['playables']
) =>
  Object.entries(playables).map(([type, cdns]) => ({
    type,
    cdns: cdns.map(mapPlayableCdn),
  }));

const mapSceneSearch = (
  sceneSearch: PlayInfoWabitResponse['playinfo']['endpoints'][0]['scene_search_list']['IMS_M'][0]
) => ({
  sceneSearchUrl: sceneSearch.scene_search_url,
  extra: {
    width: sceneSearch.extra.width,
    height: sceneSearch.extra.height,
  },
});

const mapPlayInfoEndpoint = (
  endpoint: PlayInfoWabitResponse['playinfo']['endpoints'][0]
) => ({
  id: endpoint.id,
  displayName: endpoint.display_name,
  extra: {
    playToken: endpoint.extra.play_token,
    playTokenHash: endpoint.extra.play_token_hash,
  },
  sceneSearchList: Object.entries(endpoint.scene_search_list).map(
    ([type, sceneSearchList]) => ({
      type,
      cdns: sceneSearchList.map(mapSceneSearch),
    })
  ),
  playables: mapPlayables(endpoint.playables),
  isem: endpoint.isem
    ? {
        version: endpoint.isem.version,
        endpoint: endpoint.isem.endpoint,
        isemToken: endpoint.isem.header['U-Isem-Token'],
      }
    : undefined,
});

const mapPlayerProps = (
  data: PlayInfoWabitResponse
): PretestWabikenApiResponse['data'] => ({
  type: data.playinfo.type,
  landingPage: data.playinfo.landing_page,
  refreshToken: data.playinfo.refresh_token,
  playbackRemaining: data.playinfo.playback_remain,
  notValidBefore: data.playinfo.not_valid_before,
  notValidAfter: data.playinfo.not_valid_after,
  endpoints: data.playinfo.endpoints.map(mapPlayInfoEndpoint),
});

const pretestWabikenApiHandler: NextApiHandler<
  PretestWabikenApiResponse
> = async (req, res) => {
  try {
    const apiData = await fetchPlayInfoFromWabitApi({
      userAgent: decodeURIComponent(req.query.userAgent as string),
      uuid: req.query.uuid as string,
    });

    res.status(200).json({
      result: true,
      data: mapPlayerProps(apiData),
      errorMessage: '',
    });
  } catch (error: unknown) {
    res.status(200).json({
      result: false,
      data: {} as PretestWabikenApiResponse['data'],
      errorMessage: (error as Error).message,
    });
  }
};

export default pretestWabikenApiHandler;
