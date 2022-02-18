import { useCallback, useEffect, useState } from 'react';
import {
  SearchableSortDirection,
  SearchableUserWabikenMetaSortableFields,
  SearchUserWabikenMetasQuery,
  SearchUserWabikenMetasQueryVariables,
  UserWabikenMeta,
} from '../../API';
import { searchUserWabikenMetas } from '../../graphql/queries';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';

export const DISPLAY_ORDER = {
  ADD_ASC: 'add_asc',
  ADD_DESC: 'add_desc',
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
  total: number;
};

const initialState: State = {
  isInitialized: false,
  query: '',
  displayOrder: DISPLAY_ORDER.ADD_DESC,
  isShownDetail: false,
  currentUserWabikenMeta: null,
  userWabikenMetas: [],
  total: 0,
};

export type UsePurchasedList = {
  purchasedListState: State;
  updateSearchQuery: (newValue: string) => void;
  updateDisplayOrder: (newValue: DisplayOrder) => void;
  openTitleDetail: (userWabikenMeta: UserWabikenMeta) => void;
  closeTitleDetail: () => void;
  fetchUserWabikenMetas: (args: {
    query: State['query'];
    displayOrder: State['displayOrder'];
  }) => Promise<void>;
};

// stateにいれると無限Loopするので、react外に置く
let nextToken: string | undefined | null = undefined;

const usePurchasedList = (): UsePurchasedList => {
  const [state, setState] = useState<State>(initialState);

  const { fetcher: searchFetcher } = useAmplifyFetcher<
    SearchUserWabikenMetasQuery,
    SearchUserWabikenMetasQueryVariables
  >();

  const fetchUserWabikenMetas: UsePurchasedList['fetchUserWabikenMetas'] =
    useCallback(
      async (args) => {
        const apiData = await searchFetcher(searchUserWabikenMetas, {
          sort: [
            {
              direction:
                args.displayOrder === DISPLAY_ORDER.ADD_DESC ||
                args.displayOrder === DISPLAY_ORDER.NAME_DESC
                  ? SearchableSortDirection.desc
                  : SearchableSortDirection.asc,
              field:
                args.displayOrder === DISPLAY_ORDER.ADD_DESC ||
                args.displayOrder === DISPLAY_ORDER.ADD_ASC
                  ? SearchableUserWabikenMetaSortableFields.notValidAfter
                  : SearchableUserWabikenMetaSortableFields.contentDisplayNameKana,
            },
          ],
          filter: {
            notValidAfter: { gt: Math.round(new Date().getTime() / 1000) },
            or: args.query
              ? [
                  { contentDisplayName: { match: args.query } },
                  { contentDisplayNameKana: { match: args.query } },
                ]
              : undefined,
          },
          nextToken,
        });

        const items =
          (apiData.data?.searchUserWabikenMetas?.items as UserWabikenMeta[]) ??
          [];

        const newNextToken =
          apiData.data?.searchUserWabikenMetas?.nextToken ?? undefined;

        setState((state) => ({
          ...state,
          isInitialized: true,
          userWabikenMetas: !nextToken
            ? items
            : [...state.userWabikenMetas, ...items],
          total: apiData.data?.searchUserWabikenMetas?.total ?? 0,
        }));

        nextToken = newNextToken;
      },
      [searchFetcher]
    );

  const updateSearchQuery: UsePurchasedList['updateSearchQuery'] = useCallback(
    async (newValue) => {
      nextToken = undefined;

      setState({
        ...initialState,
        query: newValue,
      });
    },
    []
  );

  const updateDisplayOrder: UsePurchasedList['updateDisplayOrder'] =
    useCallback((newValue) => {
      nextToken = undefined;

      setState((state) => ({
        ...initialState,
        query: state.query,
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

  useEffect(() => {
    fetchUserWabikenMetas({
      query: state.query,
      displayOrder: state.displayOrder,
    });
  }, [fetchUserWabikenMetas, state.displayOrder, state.query]);

  return {
    purchasedListState: state,
    updateSearchQuery,
    updateDisplayOrder,
    openTitleDetail,
    closeTitleDetail,
    fetchUserWabikenMetas,
  };
};

export default usePurchasedList;
