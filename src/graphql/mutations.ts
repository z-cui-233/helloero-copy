/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const activateWabiken = /* GraphQL */ `
  mutation ActivateWabiken($id: ID!) {
    activateWabiken(id: $id) {
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
export const createUserWabikenMeta = /* GraphQL */ `
  mutation CreateUserWabikenMeta(
    $input: CreateUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    createUserWabikenMeta(input: $input, condition: $condition) {
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
export const updateUserWabikenMeta = /* GraphQL */ `
  mutation UpdateUserWabikenMeta(
    $input: UpdateUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    updateUserWabikenMeta(input: $input, condition: $condition) {
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
export const deleteUserWabikenMeta = /* GraphQL */ `
  mutation DeleteUserWabikenMeta(
    $input: DeleteUserWabikenMetaInput!
    $condition: ModelUserWabikenMetaConditionInput
  ) {
    deleteUserWabikenMeta(input: $input, condition: $condition) {
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
