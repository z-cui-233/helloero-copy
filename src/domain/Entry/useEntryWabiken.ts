import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivateWabikenMutation,
  ActivateWabikenMutationVariables,
  CreateUserWabikenMetaMutation,
  CreateUserWabikenMetaMutationVariables,
  GetWabikenMetaQuery,
} from 'src/API';
import { activateWabiken, createUserWabikenMeta } from 'src/graphql/mutations';
import { getWabikenMeta } from 'src/graphql/queries';
import { API_VERSION } from 'src/shared/constants';
import { errorMessages } from 'src/shared/constants/errorMessages';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import useAmplifyFetcher from 'src/shared/hooks/useAmplifyFetcher';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;
type PageStatus = typeof PAGE_STATUS[keyof typeof PAGE_STATUS];

export interface UseEntryWabiken {
  entryWabikenState: {
    pageStatus: PageStatus;
    errorMessage: string;
    formValues: {
      wabiken: string;
    };
    getWabikenMetaQuery: GetWabikenMetaQuery | null;
  };
  confirmWabiken: (
    values: UseEntryWabiken['entryWabikenState']['formValues']
  ) => Promise<void>;
  consumeWabiken: () => Promise<void>;
}

const initialState: UseEntryWabiken['entryWabikenState'] = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  formValues: { wabiken: '' },
  getWabikenMetaQuery: null,
};

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();

  const { userInfo } = useLoginStateContext();

  const [entryWabikenState, setEntryWabikenState] =
    useState<UseEntryWabiken['entryWabikenState']>(initialState);

  const { fetcher: getWabikenMetaQueryFetcher } =
    useAmplifyFetcher<GetWabikenMetaQuery>();

  const { fetcher: activateWabikenFetcher } = useAmplifyFetcher<
    ActivateWabikenMutation,
    ActivateWabikenMutationVariables
  >();

  const { fetcher: createUserWabikenMetaFetcher } = useAmplifyFetcher<
    CreateUserWabikenMetaMutation,
    CreateUserWabikenMetaMutationVariables
  >();

  useEffect(() => {
    const wabiken = router.query.wabiken
      ? (router.query.wabiken as string)
      : '';

    setEntryWabikenState((entryWabikenState) => ({
      ...entryWabikenState,
      pageStatus: PAGE_STATUS.INPUT,
      formValues: { wabiken },
    }));
  }, [router.query.wabiken]);

  const confirmWabiken = useCallback(
    async (
      values: UseEntryWabiken['entryWabikenState']['formValues']
    ): Promise<void> => {
      const { wabiken } = values;

      const apiData = await getWabikenMetaQueryFetcher(getWabikenMeta, {
        id: wabiken,
      });

      if (apiData.errors) {
        const errorCode = apiData.errors?.[0]?.errorInfo?.code;

        setEntryWabikenState((entryWabikenState) => ({
          ...entryWabikenState,
          pageStatus: PAGE_STATUS.INPUT,
          errorMessage:
            errorMessages.getWabikenMeta[errorCode?.toString()] ??
            errorMessages.default,
          formValues: { wabiken },
        }));
        return;
      }

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: { wabiken },
        getWabikenMetaQuery: apiData.data ?? null,
      }));
    },
    [getWabikenMetaQueryFetcher]
  );

  const consumeWabiken = useCallback(async (): Promise<void> => {
    const lockTo = userInfo.userInfo?.username as string;
    const getWabikenMeta = entryWabikenState.getWabikenMetaQuery
      ?.getWabikenMeta as GetWabikenMetaQuery['getWabikenMeta'];

    if (!getWabikenMeta) {
      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        errorMessage: '予期せぬエラーが発生しました。もう一度お試しください。',
      }));
      return;
    }

    // 1. consume wabiken
    const activateWabikenApiData = await activateWabikenFetcher(
      activateWabiken,
      {
        id: entryWabikenState.formValues.wabiken,
        lockTo,
      }
    );

    if (activateWabikenApiData.errors) {
      const errorCode = activateWabikenApiData.errors?.[0]?.errorInfo?.code;
      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        errorMessage:
          errorMessages.getWabikenMeta[errorCode?.toString()] ??
          errorMessages.default,
      }));
      return;
    }

    // 2. save dynamoDb
    const createUserWabikenMetaApiData = await createUserWabikenMetaFetcher(
      createUserWabikenMeta,
      {
        input: {
          id: getWabikenMeta.wabiken.id as string,
          version: API_VERSION,
          notValidBefore: getWabikenMeta.wabiken.notValidBefore as number,
          notValidAfter: getWabikenMeta.wabiken.notValidAfter as number,
          lockRequired: getWabikenMeta.wabiken.lockRequired as boolean,
          playbackRemain: getWabikenMeta.wabiken.playbackRemaining as number,
          validityPeriod: getWabikenMeta.wabiken.validityPeriod as number,
          issuerTrace: getWabikenMeta.wabiken.issuerTrace,
          createdAt: getWabikenMeta.wabiken.createdAt as number,
          content: getWabikenMeta.wabiken.content,
          activatedAt: getWabikenMeta.wabiken.activatedAt as number,
          lockedTo: lockTo,
        },
      }
    );

    if (createUserWabikenMetaApiData.errors) {
      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        errorMessage: errorMessages.default,
      }));
      return;
    }

    setEntryWabikenState((entryWabikenState) => ({
      ...entryWabikenState,
      pageStatus: PAGE_STATUS.COMPLETE,
    }));
  }, [
    activateWabikenFetcher,
    createUserWabikenMetaFetcher,
    entryWabikenState.formValues.wabiken,
    entryWabikenState.getWabikenMetaQuery?.getWabikenMeta,
    userInfo.userInfo?.username,
  ]);

  return {
    entryWabikenState,
    confirmWabiken,
    consumeWabiken,
  };
};

export default useEntryWabiken;
