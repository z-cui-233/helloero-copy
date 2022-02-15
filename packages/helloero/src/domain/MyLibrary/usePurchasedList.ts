import { useCallback, useEffect, useState } from 'react';
import {
  ModelSortDirection,
  UserWabikenMeta,
  UserWabikenMetaByOwnerByContentDisplayNameQuery,
  UserWabikenMetaByOwnerByContentDisplayNameQueryVariables,
  UserWabikenMetaByOwnerByNotValidAfterQuery,
  UserWabikenMetaByOwnerByNotValidAfterQueryVariables,
} from '../../API';
import {
  userWabikenMetaByOwnerByContentDisplayName,
  userWabikenMetaByOwnerByNotValidAfter,
} from '../../graphql/queries';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

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
  hasNext: boolean;
};

const initialState: State = {
  isInitialized: false,
  query: '',
  displayOrder: DISPLAY_ORDER.ADD_DESC,
  isShownDetail: false,
  currentUserWabikenMeta: null,
  userWabikenMetas: [],
  hasNext: false,
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
  const { userInfo } = useLoginStateContext();
  const [state, setState] = useState<State>(initialState);

  const { fetcher: notValidAfterQueryFetcher } = useAmplifyFetcher<
    UserWabikenMetaByOwnerByNotValidAfterQuery,
    UserWabikenMetaByOwnerByNotValidAfterQueryVariables
  >();

  const { fetcher: displayNameQueryFetcher } = useAmplifyFetcher<
    UserWabikenMetaByOwnerByContentDisplayNameQuery,
    UserWabikenMetaByOwnerByContentDisplayNameQueryVariables
  >();

  const fetchUserWabikenMetas: UsePurchasedList['fetchUserWabikenMetas'] =
    useCallback(
      async (args) => {
        const fetchData = async (): Promise<{
          items: UserWabikenMeta[] | [];
          newNextToken: string | undefined | null;
        }> => {
          const notValidAfter = { gt: Math.round(new Date().getTime() / 1000) };
          const queryParams = {
            owner: userInfo.userName ?? '',
            sortDirection:
              args.displayOrder === DISPLAY_ORDER.ADD_DESC ||
              args.displayOrder === DISPLAY_ORDER.NAME_DESC
                ? ModelSortDirection.DESC
                : ModelSortDirection.ASC,
            filter: {
              or: [
                {
                  contentDisplayName: {
                    contains: args.query ?? undefined,
                  },
                },
                {
                  contentDisplayNameKana: {
                    contains: args.query ?? undefined,
                  },
                },
              ],
            },
            nextToken,
          };

          if (
            args.displayOrder === DISPLAY_ORDER.ADD_DESC ||
            args.displayOrder === DISPLAY_ORDER.ADD_ASC
          ) {
            const apiData = await notValidAfterQueryFetcher(
              userWabikenMetaByOwnerByNotValidAfter,
              {
                ...queryParams,
                notValidAfter,
              }
            );

            return {
              items:
                (apiData.data?.userWabikenMetaByOwnerByNotValidAfter
                  ?.items as UserWabikenMeta[]) ?? [],
              newNextToken:
                apiData.data?.userWabikenMetaByOwnerByNotValidAfter
                  ?.nextToken ?? undefined,
            };
          }

          const apiData = await displayNameQueryFetcher(
            userWabikenMetaByOwnerByContentDisplayName,
            {
              ...queryParams,
              filter: {
                ...queryParams.filter,
                notValidAfter,
              },
            }
          );

          return {
            items:
              (apiData.data?.userWabikenMetaByOwnerByContentDisplayName
                ?.items as UserWabikenMeta[]) ?? [],
            newNextToken:
              apiData.data?.userWabikenMetaByOwnerByContentDisplayName
                ?.nextToken ?? undefined,
          };
        };

        const { items, newNextToken } = await fetchData();

        setState((state) => ({
          ...state,
          isInitialized: true,
          userWabikenMetas: !nextToken
            ? (items as UserWabikenMeta[])
            : ([...state.userWabikenMetas, ...items] as UserWabikenMeta[]),
          hasNext: !!newNextToken,
        }));

        nextToken = newNextToken;
      },
      [displayNameQueryFetcher, notValidAfterQueryFetcher, userInfo.userName]
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
