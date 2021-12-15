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
          key {
            id
            type
            providerId
          }
          displayName
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
        issuerTrace
        activatedAt
      }
      result
    }
  }
`;
export const getPlayInfo = /* GraphQL */ `
  query GetPlayInfo(
    $wabikenId: String!
    $deviceCode: String!
    $deviceId: String!
  ) {
    getPlayInfo(
      wabikenId: $wabikenId
      deviceCode: $deviceCode
      deviceId: $deviceId
    ) {
      playInfo {
        type
        landingPage
        endpoints {
          id
          displayName
          sceneSearchList {
            type
            cdns {
              sceneSearchUrl
            }
          }
          playables {
            type
            cdns {
              cdnId
              weight
              playlistUrl
            }
          }
          isem {
            version
            endpoint
            isemToken
          }
          extra {
            playToken
            playTokenHash
          }
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
      playbackRemaining
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
        displayName
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
        playbackRemaining
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
          displayName
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
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
