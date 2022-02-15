/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserWabikenMeta = /* GraphQL */ `
  subscription OnCreateUserWabikenMeta($owner: String) {
    onCreateUserWabikenMeta(owner: $owner) {
      id
      version
      notValidBefore
      notValidAfter
      lockRequired
      playbackRemaining
      validityPeriod
      issuerTrace
      createdAt
      contentDisplayName
      contentDisplayNameKana
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
      owner
      updatedAt
    }
  }
`;
export const onUpdateUserWabikenMeta = /* GraphQL */ `
  subscription OnUpdateUserWabikenMeta($owner: String) {
    onUpdateUserWabikenMeta(owner: $owner) {
      id
      version
      notValidBefore
      notValidAfter
      lockRequired
      playbackRemaining
      validityPeriod
      issuerTrace
      createdAt
      contentDisplayName
      contentDisplayNameKana
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
      owner
      updatedAt
    }
  }
`;
export const onDeleteUserWabikenMeta = /* GraphQL */ `
  subscription OnDeleteUserWabikenMeta($owner: String) {
    onDeleteUserWabikenMeta(owner: $owner) {
      id
      version
      notValidBefore
      notValidAfter
      lockRequired
      playbackRemaining
      validityPeriod
      issuerTrace
      createdAt
      contentDisplayName
      contentDisplayNameKana
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
      owner
      updatedAt
    }
  }
`;
