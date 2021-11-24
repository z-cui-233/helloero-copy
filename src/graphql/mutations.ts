/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const activateWabiken = /* GraphQL */ `
  mutation ActivateWabiken($token: String!, $lockTo: String!) {
    activateWabiken(token: $token, lockTo: $lockTo) {
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
export const createUserWabikenMeta = /* GraphQL */ `
  mutation CreateUserWabikenMeta(
    $input: CreateUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    createUserWabikenMeta(input: $input, condition: $condition) {
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
export const updateUserWabikenMeta = /* GraphQL */ `
  mutation UpdateUserWabikenMeta(
    $input: UpdateUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    updateUserWabikenMeta(input: $input, condition: $condition) {
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
export const deleteUserWabikenMeta = /* GraphQL */ `
  mutation DeleteUserWabikenMeta(
    $input: DeleteUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    deleteUserWabikenMeta(input: $input, condition: $condition) {
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
