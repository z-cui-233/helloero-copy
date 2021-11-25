/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWabikenMeta = /* GraphQL */ `
  query GetWabikenMeta($id: ID!) {
    getWabikenMeta(id: $id) {
      wabiken {
        id
        token
        version
        not_valid_before
        not_valid_after
        lock_required
        playback_remain
        validity_period
        issuer_tracer
        created_at
        activated_at
        locked_to
        content {
          id
          catchphrase
          comment
          duration
          evaluation_point
          release_date
          main_episode_code
        }
      }
      result
    }
  }
`;
export const getPlayinfo = /* GraphQL */ `
  query GetPlayinfo(
    $token: String!
    $deviceCode: String!
    $lock: String!
    $deviceId: String!
  ) {
    getPlayinfo(
      token: $token
      deviceCode: $deviceCode
      lock: $lock
      deviceId: $deviceId
    ) {
      playinfo {
        type
        landing_page
        endpoints {
          id
          display_name
        }
        isem_token
        refresh_token
        playback_remain
        not_valid_before
        not_valid_after
      }
      result
    }
  }
`;
export const getUserWabikenMeta = /* GraphQL */ `
  query GetUserWabikenMeta($id: ID!) {
    getUserWabikenMeta(id: $id) {
      id
      token
      version
      not_valid_before
      not_valid_after
      lock_required
      playback_remain
      validity_period
      issuer_tracer
      created_at
      activated_at
      content {
        id
        key {
          id
          type
          provider_id
        }
        catchphrase
        comment
        duration
        evaluation_point
        maker {
          code
          name
        }
        series {
          code
          name
        }
        release_date
        public_period {
          since
          until
        }
        sale_period {
          since
          until
        }
        payment_badge {
          code
          name
        }
        thumbnails {
          url
        }
        main_episode_code
      }
      locked_to
      createdAt
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
        token
        version
        not_valid_before
        not_valid_after
        lock_required
        playback_remain
        validity_period
        issuer_tracer
        created_at
        activated_at
        content {
          id
          catchphrase
          comment
          duration
          evaluation_point
          release_date
          main_episode_code
        }
        locked_to
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
