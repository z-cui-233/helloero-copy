const mapPlayableCdn = (cdn) => ({
  cdnId: cdn.id,
  weight: cdn.weight,
  playlistUrl: cdn.playlist_url,
  licenseUrlList: Object.entries(cdn.license_url_list).map(([key, value]) => ({
    drmType: key,
    version: value.version,
    endpoint: value.endpoint,
  })),
});

const mapPlayables = (playables) =>
  Object.entries(playables).map(([type, cdns]) => ({
    type,
    cdns: cdns.map(mapPlayableCdn),
  }));

const mapSceneSearch = (sceneSearch) => ({
  sceneSearchUrl: sceneSearch.scene_search_url,
  extra: {
    width: sceneSearch.extra.width,
    height: sceneSearch.extra.height,
  },
});

const mapPlayInfoEndpoint = (endpoint) => ({
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
  isem: {
    version: endpoint.isem.version,
    endpoint: endpoint.isem.endpoint,
    isemToken: endpoint.isem.header['U-Isem-Token'],
  },
});

const mapPlayInfo = (playInfo) => ({
  type: playInfo.type,
  landingPage: playInfo.landing_page,
  refreshToken: playInfo.refresh_token,
  playbackRemaining: playInfo.playback_remain,
  notValidBefore: playInfo.not_valid_before,
  notValidAfter: playInfo.not_valid_after,
  endpoints: playInfo.endpoints.map(mapPlayInfoEndpoint),
});

module.exports = { mapPlayInfo };
