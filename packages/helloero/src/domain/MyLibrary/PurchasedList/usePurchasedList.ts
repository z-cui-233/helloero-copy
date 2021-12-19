import { useCallback, useEffect, useState } from 'react';
import {
  ListUserWabikenMetasQuery,
  ListUserWabikenMetasQueryVariables,
  UserWabikenMeta,
} from '../../../API';
import { listUserWabikenMetas } from '../../../graphql/queries';
import { LIST_PAGE_SIZE } from '@/localShared/constants';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';

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
    userWabikenMetas: UserWabikenMeta[] | [];
    nextToken: string | undefined;
  };
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  toggleListStyle: () => void;
  openTitleDetail: (userWabikenMeta: UserWabikenMeta) => void;
  closeTitleDetail: () => void;
  fetchListData: (nextToken?: string) => Promise<void>;
}

const initialState: UsePurchasedList['purchasedListState'] = {
  isInitialized: false,
  query: '',
  displayOrder: DISPLAY_ORDER.ADD,
  isCardStyle: false,
  isShownDetail: false,
  currentUserWabikenMeta: null,
  userWabikenMetas: [],
  nextToken: undefined,
};

const usePurchasedList = (): UsePurchasedList => {
  const [purchasedListState, setPurchasedListState] =
    useState<UsePurchasedList['purchasedListState']>(initialState);

  const { fetcher } = useAmplifyFetcher<
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

  const fetchListData: UsePurchasedList['fetchListData'] = useCallback(
    async (nextToken) => {
      const apiData = await fetcher(listUserWabikenMetas, {
        filter: {
          notValidAfter: {
            gt: Math.round(new Date().getTime() / 1000),
          },
        },
        limit: LIST_PAGE_SIZE,
        nextToken: nextToken ?? null,
      });

      const newList = apiData.data?.listUserWabikenMetas?.items ?? [];

      setPurchasedListState((purchasedListState) => {
        return {
          ...purchasedListState,
          isInitialized: true,
          userWabikenMetas: [
            ...purchasedListState.userWabikenMetas,
            ...newList,
          ],
          nextToken: apiData.data?.listUserWabikenMetas?.nextToken ?? undefined,
        };
      });
    },
    [fetcher]
  );

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  return {
    purchasedListState,
    updateSearchQuery,
    updateDisplayOrder,
    toggleListStyle,
    openTitleDetail,
    closeTitleDetail,
    fetchListData,
  };
};

export default usePurchasedList;
