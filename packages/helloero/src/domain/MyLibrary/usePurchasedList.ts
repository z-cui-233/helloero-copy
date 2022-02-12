import { useCallback, useEffect, useState } from 'react';
import {
  ListUserWabikenMetasQuery,
  ListUserWabikenMetasQueryVariables,
  UserWabikenMeta,
} from '../../API';
import { listUserWabikenMetas } from '../../graphql/queries';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';

export const DISPLAY_ORDER = {
  ADD: 'add',
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
} as const;
export type DisplayOrder = typeof DISPLAY_ORDER[keyof typeof DISPLAY_ORDER];

type State = {
  isInitialized: boolean;
  query: string;
  displayOrder: DisplayOrder;
  isShownDetail: boolean;
  currentUserWabikenMeta: UserWabikenMeta | null;
  userWabikenMetas: UserWabikenMeta[] | [];
  nextToken: string | undefined;
};

const initialState: State = {
  isInitialized: false,
  query: '',
  displayOrder: DISPLAY_ORDER.ADD,
  isShownDetail: false,
  currentUserWabikenMeta: null,
  userWabikenMetas: [],
  nextToken: undefined,
};

export type UsePurchasedList = {
  purchasedListState: State;
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  openTitleDetail: (userWabikenMeta: UserWabikenMeta) => void;
  closeTitleDetail: () => void;
  fetchListData: (nextToken?: string) => Promise<void>;
};

const usePurchasedList = (): UsePurchasedList => {
  const [state, setState] = useState<State>(initialState);

  const { fetcher } = useAmplifyFetcher<
    ListUserWabikenMetasQuery,
    ListUserWabikenMetasQueryVariables
  >();

  const updateSearchQuery: UsePurchasedList['updateSearchQuery'] = useCallback(
    (newValue) => {
      setState((state) => ({
        ...state,
        query: newValue,
      }));
    },
    []
  );

  const updateDisplayOrder: UsePurchasedList['updateDisplayOrder'] =
    useCallback((newValue) => {
      setState((state) => ({
        ...state,
        displayOrder: newValue,
      }));
    }, []);

  const openTitleDetail: UsePurchasedList['openTitleDetail'] = useCallback(
    (data) => {
      setState((state) => ({
        ...state,
        isShownDetail: true,
        currentUserWabikenMeta: data,
      }));
    },
    []
  );

  const closeTitleDetail: UsePurchasedList['closeTitleDetail'] =
    useCallback(() => {
      setState((state) => ({
        ...state,
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
        nextToken: nextToken ?? null,
      });

      const newList = apiData.data?.listUserWabikenMetas?.items ?? [];

      setState((state) => ({
        ...state,
        isInitialized: true,
        userWabikenMetas: [
          ...state.userWabikenMetas,
          ...newList,
        ] as UserWabikenMeta[],
        nextToken: apiData.data?.listUserWabikenMetas?.nextToken ?? undefined,
      }));
    },
    [fetcher]
  );

  useEffect(() => {
    fetchListData();
  }, [fetchListData]);

  return {
    purchasedListState: state,
    updateSearchQuery,
    updateDisplayOrder,
    openTitleDetail,
    closeTitleDetail,
    fetchListData,
  };
};

export default usePurchasedList;
