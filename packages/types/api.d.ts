export interface ApiResponse {
  result: boolean;
  errorMessage: string;
}

export interface PretestWabikenApiResponse extends ApiResponse {
  data: WabitPlayInfoApiResponse | null;
}

export interface WabitPlayInfoApiResponse {
  result: boolean;
  playinfo: Playinfo;
  error?: {
    code: number;
    message: string;
  };
}

interface Playinfo {
  type: string;
  landing_page: string;
  endpoints: Endpoint[];
  refresh_token: string;
  playback_remain: number;
  not_valid_before: number;
  not_valid_after: number;
}

interface Endpoint {
  id: string;
  display_name: string;
  scene_search_list: Scenesearchlist;
  playables: Playables;
  extra: Extra2;
}

interface Extra2 {
  play_token: string;
  play_token_hash: string;
  beacon_interval: string;
}

interface Playables {
  dash: Dash[];
  'hls-fp': Hlsfp[];
  'hls-s-aes': Hlsfp[];
  smooth: Smooth[];
}

interface Smooth {
  cdn_id: string;
  license_url_list: Licenseurllist3;
  playlist_url: string;
  weight: number;
}

interface Licenseurllist3 {
  playready: Playready;
}

interface Hlsfp {
  cdn_id: string;
  license_url_list: Licenseurllist2;
  playlist_url: string;
  weight: number;
}

interface Licenseurllist2 {
  fairplay: Playready;
}

interface Dash {
  cdn_id: string;
  license_url_list: Licenseurllist;
  playlist_url: string;
  weight: number;
}

interface Licenseurllist {
  playready: Playready;
  widevine: Playready;
}

interface Playready {
  version: string;
  endpoint: string;
}

interface Scenesearchlist {
  IMS_AD1: IMSAD1[];
  IMS_L: IMSAD1[];
  IMS_M: IMSAD1[];
  IMS_S: IMSAD1[];
}

interface IMSAD1 {
  scene_search_url: string;
  extra: Extra;
}

interface Extra {
  width: number;
  height: number;
}
