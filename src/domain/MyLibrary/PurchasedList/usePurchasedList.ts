import { useCallback, useEffect, useState } from 'react';
import {
  ListUserWabikenMetasQuery,
  ListUserWabikenMetasQueryVariables,
  UserWabikenMeta,
} from 'src/API';
import { listUserWabikenMetas } from 'src/graphql/queries';
import { LIST_PAGE_SIZE } from 'src/shared/constants';
import useAmplifyFetcher from 'src/shared/hooks/useAmplifyFetcher';

export const DISPLAY_ORDER = {
  ADD: 'add',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;
export type DisplayOrder = typeof DISPLAY_ORDER[keyof typeof DISPLAY_ORDER];

export interface UsePurchasedList {
  purchasedListState: {
    isInitialized: boolean;
    query: string;
    displayOrder: DisplayOrder;
    isCardStyle: boolean;
    isShownDetail: boolean;
    currentUserWabikenMeta: UserWabikenMeta | null;
  };
  listData: UserWabikenMeta[] | undefined;
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  toggleListStyle: () => void;
  openTitleDetail: (userWabikenMeta: UserWabikenMeta) => void;
  closeTitleDetail: () => void;
}

const initialState: UsePurchasedList['purchasedListState'] = {
  isInitialized: false,
  query: '',
  displayOrder: DISPLAY_ORDER.ADD,
  isCardStyle: false,
  isShownDetail: false,
  currentUserWabikenMeta: null,
};

const usePurchasedList = (): UsePurchasedList => {
  const [purchasedListState, setPurchasedListState] =
    useState<UsePurchasedList['purchasedListState']>(initialState);

  const { fetcher, data: listData } = useAmplifyFetcher<
    ListUserWabikenMetasQuery,
    ListUserWabikenMetasQueryVariables
  >();

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

  const openTitleDetail: UsePurchasedList['openTitleDetail'] = useCallback(
    (data) => {
      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        isShownDetail: true,
        currentUserWabikenMeta: data,
      }));
    },
    []
  );

  const closeTitleDetail: UsePurchasedList['closeTitleDetail'] =
    useCallback(() => {
      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        isShownDetail: false,
        currentUserWabikenMeta: null,
      }));
    }, []);

  useEffect(() => {
    (async () => {
      await fetcher(listUserWabikenMetas, {
        filter: null,
        limit: LIST_PAGE_SIZE,
        nextToken: null,
      });

      setPurchasedListState((purchasedListState) => ({
        ...purchasedListState,
        isInitialized: true,
      }));
    })();
  }, [fetcher]);

  return {
    purchasedListState,
    listData: listData?.data?.listUserWabikenMetas?.items,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
    openTitleDetail,
    closeTitleDetail,
  };
};

export default usePurchasedList;
