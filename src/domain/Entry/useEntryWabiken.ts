import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GetWabikenMetaQuery } from 'src/API';
import { getWabikenMeta } from 'src/graphql/queries';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseEntryWabiken {
  state: {
    pageStatus: PageStatus;
    errorMessage: string;
    formValues: {
      wabiken: string;
    };
    getWabikenMetaQuery: GetWabikenMetaQuery | null;
  };
  confirmWabiken: (
    values: UseEntryWabiken['state']['formValues']
  ) => Promise<void>;
  consumeWabiken: () => void;
}

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();
  const [state, setState] = useState<UseEntryWabiken['state']>({
    pageStatus: PAGE_STATUS.INIT,
    errorMessage: '',
    formValues: {
      wabiken: '',
    },
    getWabikenMetaQuery: null,
  });

  useEffect(() => {
    const wabiken = router.query.wabiken
      ? (router.query.wabiken as string)
      : '';

    setState((state) => ({
      ...state,
      pageStatus: wabiken !== '' ? PAGE_STATUS.CONFIRM : PAGE_STATUS.INPUT,
    }));
  }, [router.query.wabiken]);

  const confirmWabiken = async (
    values: UseEntryWabiken['state']['formValues']
  ): Promise<void> => {
    const wabiken = values.wabiken;

    try {
      const wabikenGQLData = (await API.graphql(
        graphqlOperation(getWabikenMeta, {
          id: wabiken,
        })
      )) as GraphQLResult<GetWabikenMetaQuery>;

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: {
          wabiken,
        },
        getWabikenMetaQuery: wabikenGQLData.data ?? null,
      }));
    } catch (error) {
      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.INPUT,
        errorMessage: '予期せぬエラーが発生しました。もう一度お試しください。',
        formValues: {
          wabiken,
        },
      }));
    }
  };

  const consumeWabiken = (): void => {
    setState((state) => ({
      ...state,
      pageStatus: PAGE_STATUS.COMPLETE,
    }));
  };

  return {
    state,
    confirmWabiken,
    consumeWabiken,
  };
};

export default useEntryWabiken;
