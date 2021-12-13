import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivateWabikenMutation,
  ActivateWabikenMutationVariables,
  CreateUserWabikenMetaInput,
  CreateUserWabikenMetaMutation,
  CreateUserWabikenMetaMutationVariables,
  GetWabikenMetaQuery,
  GetWabikenMetaQueryVariables,
  WabikenMeta,
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

const isCreateUserWabikenMetaInput = (
  input: WabikenMeta | CreateUserWabikenMetaInput | undefined
): input is CreateUserWabikenMetaInput => {
  return !!input?.content.key;
};

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();
  const { userInfo } = useLoginStateContext();

  const [entryWabikenState, setEntryWabikenState] =
    useState<UseEntryWabiken['entryWabikenState']>(initialState);

  const {
    fetcher: getWabikenMetaQueryFetcher,
    loading: getWabikenMetaQueryLoading,
  } = useAmplifyFetcher<GetWabikenMetaQuery, GetWabikenMetaQueryVariables>();

  const { fetcher: activateWabikenFetcher, loading: activateWabikenLoading } =
    useAmplifyFetcher<
      ActivateWabikenMutation,
      ActivateWabikenMutationVariables
    >();

  const {
    fetcher: createUserWabikenMetaFetcher,
    loading: createUserWabikenMetaLoading,
  } = useAmplifyFetcher<
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
      if (getWabikenMetaQueryLoading) {
        return;
      }

      const apiData = await getWabikenMetaQueryFetcher(getWabikenMeta, {
        id: values.wabiken,
      });

      if (apiData.errors) {
        const errorCode = apiData.errors?.[0]?.errorInfo?.code;

        setEntryWabikenState((entryWabikenState) => ({
          ...entryWabikenState,
          pageStatus: PAGE_STATUS.INPUT,
          errorMessage:
            errorMessages.getWabikenMeta[errorCode] ?? errorMessages.default,
          formValues: {
            wabiken: values.wabiken,
          },
        }));
        return;
      }

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: { wabiken: values.wabiken },
        getWabikenMetaQuery: apiData.data ?? null,
      }));
    },
    [getWabikenMetaQueryFetcher, getWabikenMetaQueryLoading]
  );

  const consumeWabiken = useCallback(async (): Promise<void> => {
    if (activateWabikenLoading || createUserWabikenMetaLoading) {
      return;
    }

    const lockTo = userInfo.userInfo?.username as string;
    const getWabikenMeta = entryWabikenState.getWabikenMetaQuery
      ?.getWabikenMeta as GetWabikenMetaQuery['getWabikenMeta'];

    if (
      !getWabikenMeta ||
      !isCreateUserWabikenMetaInput(getWabikenMeta?.wabiken)
    ) {
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
          errorMessages.activateWabiken[errorCode] ?? errorMessages.default,
      }));
      return;
    }

    // 2. save dynamoDb
    const createUserWabikenMetaApiData = await createUserWabikenMetaFetcher(
      createUserWabikenMeta,
      {
        input: {
          id: getWabikenMeta.wabiken.id,
          version: API_VERSION,
          notValidBefore: getWabikenMeta.wabiken.notValidBefore,
          notValidAfter: getWabikenMeta.wabiken.notValidAfter,
          lockRequired: getWabikenMeta.wabiken.lockRequired,
          playbackRemaining: getWabikenMeta.wabiken.playbackRemaining,
          validityPeriod: getWabikenMeta.wabiken.validityPeriod,
          issuerTrace: getWabikenMeta.wabiken.issuerTrace,
          createdAt: getWabikenMeta.wabiken.createdAt,
          content: getWabikenMeta.wabiken.content,
          activatedAt: activateWabikenApiData.data?.activateWabiken?.wabiken
            .activatedAt as number,
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
    activateWabikenLoading,
    createUserWabikenMetaFetcher,
    createUserWabikenMetaLoading,
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
