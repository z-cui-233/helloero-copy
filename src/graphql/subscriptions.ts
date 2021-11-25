/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserWabikenMeta = /* GraphQL */ `
  subscription OnCreateUserWabikenMeta($owner: String!) {
    onCreateUserWabikenMeta(owner: $owner) {
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
export const onUpdateUserWabikenMeta = /* GraphQL */ `
  subscription OnUpdateUserWabikenMeta($owner: String!) {
    onUpdateUserWabikenMeta(owner: $owner) {
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
export const onDeleteUserWabikenMeta = /* GraphQL */ `
  subscription OnDeleteUserWabikenMeta($owner: String!) {
    onDeleteUserWabikenMeta(owner: $owner) {
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
