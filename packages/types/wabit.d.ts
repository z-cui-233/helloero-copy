export interface PlayInfoWabitResponse {
  result: boolean;
  playinfo: Playinfo;
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
  isem: Isem;
  extra: Extra2;
}

interface Extra2 {
  play_token: string;
  play_token_hash: string;
  beacon_interval: string;
}

interface Isem {
  version: string;
  endpoint: string;
  header: Header;
}

interface Header {
  'U-Isem-Token': string;
}

interface Playables {
  dash: Dash[];
  smooth: Smooth[];
}

interface Smooth {
  weight: number;
  cdn_id: string;
  playlist_url: string;
  license_url_list: Licenseurllist2;
}

interface Licenseurllist2 {
  playready: Playready;
}

interface Dash {
  weight: number;
  cdn_id: string;
  playlist_url: string;
  license_url_list: Licenseurllist;
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
