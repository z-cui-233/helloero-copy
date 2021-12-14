import { useCallback, useEffect, useState } from 'react';
import {
  ListUserWabikenMetasQuery,
  ListUserWabikenMetasQueryVariables,
} from 'src/API';
import useAmplifyFetcher from 'src/shared/hooks/useAmplifyFetcher';

export const DISPLAY_ORDER = {
  ADD: 'add',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;
export type DisplayOrder = typeof DISPLAY_ORDER[keyof typeof DISPLAY_ORDER];

export interface UsePurchasedList {
  purchasedListState: {
    query: string;
    displayOrder: DisplayOrder;
    isCardStyle: boolean;
  };
  listData: ListUserWabikenMetasQuery | undefined;
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  toggleListStyle: () => void;
}

const initialState: UsePurchasedList['purchasedListState'] = {
  query: '',
  displayOrder: DISPLAY_ORDER.ADD,
  isCardStyle: false,
};

const ___listUserWabikenMetas = /* GraphQL */ `
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

const usePurchasedList = (): UsePurchasedList => {
  const [purchasedListState, setPurchasedListState] =
    useState<UsePurchasedList['purchasedListState']>(initialState);

  const { fetcher, data: listData } = useAmplifyFetcher<
    ListUserWabikenMetasQuery,
    ListUserWabikenMetasQueryVariables
  >();

  useEffect(() => {
    fetcher(___listUserWabikenMetas, {
      filter: null,
      limit: 20,
      nextToken: null,
    });
  }, [fetcher]);

  const updateSearchQuery: UsePurchasedList['updateSearchQuery'] = useCallback(
    (newValue) => {
      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        query: newValue,
      }));
    },
    []
  );

  const updateDisplayOrder: UsePurchasedList['updateDisplayOrder'] =
    useCallback((newValue) => {
      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        displayOrder: newValue,
      }));
    }, []);

  const toggleListStyle: UsePurchasedList['toggleListStyle'] =
    useCallback(() => {
      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        isCardStyle: !purchasedListState.isCardStyle,
      }));
    }, []);

  return {
    purchasedListState,
    listData: listData?.data,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
  };
};

export default usePurchasedList;
