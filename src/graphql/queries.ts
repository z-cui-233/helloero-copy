/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWabikenMeta = /* GraphQL */ `
  query GetWabikenMeta($id: ID!) {
    getWabikenMeta(id: $id) {
      wabiken {
        id
        version
        notValidBefore
        notValidAfter
        lockRequired
        playbackRemaining
        validityPeriod
        createdAt
        content {
          id
          catchphrase
          comment
          duration
          evaluationPoint
          releaseDate
          mainEpisodeCode
        }
        issuerTrace
        lockedTo
        activatedAt
      }
      result
    }
  }
`;
export const getPlayInfo = /* GraphQL */ `
  query GetPlayInfo(
    $token: String!
    $deviceCode: String!
    $lock: String!
    $deviceId: String!
  ) {
    getPlayInfo(
      token: $token
      deviceCode: $deviceCode
      lock: $lock
      deviceId: $deviceId
    ) {
      playInfo {
        type
        landingPage
        endpoints {
          id
          displayName
        }
        refreshToken
        playbackRemaining
        notValidBefore
        notValidAfter
      }
      result
    }
  }
`;
export const getUserWabikenMeta = /* GraphQL */ `
  query GetUserWabikenMeta($id: ID!) {
    getUserWabikenMeta(id: $id) {
      id
      version
      notValidBefore
      notValidAfter
      lockRequired
      playbackRemain
      validityPeriod
      issuerTrace
      createdAt
      content {
        id
        key {
          id
          type
          providerId
        }
        catchphrase
        comment
        duration
        evaluationPoint
        maker {
          code
          name
        }
        series {
          code
          name
        }
        releaseDate
        publicPeriod {
          since
          until
        }
        salePeriod {
          since
          until
        }
        paymentBadge {
          code
          name
        }
        thumbnails {
          packageL
          packageM
          packageS
          standard
          tsptFhds
          tsptFwxga
        }
        mainEpisodeCode
      }
      activatedAt
      lockedTo
      updatedAt
      owner
    }
  }
`;
export const listUserWabikenMetas = /* GraphQL */ `
  query ListUserWabikenMetas(
    $filter: ModelUserWabikenMetaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserWabikenMetas(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        version
        notValidBefore
        notValidAfter
        lockRequired
        playbackRemain
        validityPeriod
        issuerTrace
        createdAt
        content {
          id
          catchphrase
          comment
          duration
          evaluationPoint
          releaseDate
          mainEpisodeCode
        }
        activatedAt
        lockedTo
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
