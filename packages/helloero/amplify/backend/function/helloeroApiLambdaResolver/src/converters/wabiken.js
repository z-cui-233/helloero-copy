const mapThumbnails = (thumbnails) => ({
  packageL: thumbnails.package_l,
  packageM: thumbnails.package_m,
  packageS: thumbnails.package_s,
  standard: thumbnails.standard,
  tsptFhds: thumbnails.tspt_fhds,
  tsptFwxga: thumbnails.tspt_fwxga,
});

const mapContentMeta = (content) => ({
  id: content.key.id,
  key: {
    id: content.key.id,
    type: content.key.type,
    providerId: content.key.provider_id,
  },
  displayName: content.display_name,
  catchphrase: content.catchphrase,
  comment: content.comment,
  duration: content.duration,
  evaluationPoint: content.evaluation_point,
  maker: content.maker,
  series: content.series,
  releaseDate: content.release_date,
  publicPeriod: content.public_period,
  salePeriod: content.sale_period,
  paymentBadge: content.payment_badge,
  thumbnails: content.thumbnails && mapThumbnails(content.thumbnails),
  mainEpisodeCode: content.main_episode_code,
});

const mapWabikenMeta = (wabiken) => ({
  id: wabiken.token,
  version: wabiken.version,
  notValidBefore: wabiken.not_valid_before,
  notValidAfter: wabiken.not_valid_after,
  validityPeriod: wabiken.validity_period,
  lockRequired: wabiken.lock_required,
  playbackRemaining: wabiken.playback_remain,
  createdAt: wabiken.created_at,
  content: mapContentMeta(wabiken.content),
  issuerTrace: wabiken.issuer_trace,
  activatedAt: wabiken.activated_at,
});

const mapWabikenResponse = (wabikenRespone) => {
  const { wabiken, result } = wabikenRespone;

  return {
    result,
    wabiken: mapWabikenMeta(wabiken),
  };
};

module.exports = { mapWabikenResponse };
