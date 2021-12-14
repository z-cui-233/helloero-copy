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
import {
  ErrorCodeActivateWabiken,
  ErrorCodeGetWabikenMeta,
  errorMessages,
} from 'src/shared/constants/errorMessages';
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
  formValues: {
    wabiken: '',
  },
  getWabikenMetaQuery: null,
};

const isCreateUserWabikenMetaInput = (
  input: WabikenMeta | CreateUserWabikenMetaInput | undefined
): input is CreateUserWabikenMetaInput => {
  return !!(
    input &&
    input.content &&
    input.content.key &&
    input.content.thumbnails
  );
};

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();

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

  const confirmWabiken: UseEntryWabiken['confirmWabiken'] = useCallback(
    async (values) => {
      if (getWabikenMetaQueryLoading) {
        return;
      }

      const apiData = await getWabikenMetaQueryFetcher(getWabikenMeta, {
        id: values.wabiken,
      });

      if (apiData.errors) {
        const errorMessage =
          errorMessages.getWabikenMeta[
            apiData.errors?.[0]?.errorInfo?.code as ErrorCodeGetWabikenMeta
          ] ?? errorMessages.default;

        setEntryWabikenState((entryWabikenState) => ({
          ...entryWabikenState,
          pageStatus: PAGE_STATUS.INPUT,
          errorMessage,
          formValues: values,
        }));
        return;
      }

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: values,
        getWabikenMetaQuery: apiData.data ?? null,
      }));
    },
    [getWabikenMetaQueryFetcher, getWabikenMetaQueryLoading]
  );

  const consumeWabiken: UseEntryWabiken['consumeWabiken'] =
    useCallback(async () => {
      if (activateWabikenLoading || createUserWabikenMetaLoading) {
        return;
      }

      const getWabikenMeta = entryWabikenState.getWabikenMetaQuery
        ?.getWabikenMeta as GetWabikenMetaQuery['getWabikenMeta'];

      if (
        !getWabikenMeta ||
        !isCreateUserWabikenMetaInput(getWabikenMeta?.wabiken)
      ) {
        setEntryWabikenState((entryWabikenState) => ({
          ...entryWabikenState,
          errorMessage: errorMessages.default,
        }));
        return;
      }

      // 1. consume wabiken
      const activateWabikenApiData = await activateWabikenFetcher(
        activateWabiken,
        {
          id: entryWabikenState.formValues.wabiken,
        }
      );

      if (activateWabikenApiData.errors) {
        const errorMessage =
          errorMessages.activateWabiken[
            activateWabikenApiData.errors?.[0]?.errorInfo
              ?.code as ErrorCodeActivateWabiken
          ] ?? errorMessages.default;

        setEntryWabikenState((entryWabikenState) => ({
          ...entryWabikenState,
          errorMessage,
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
    ]);

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

  return {
    entryWabikenState,
    confirmWabiken,
    consumeWabiken,
  };
};

export default useEntryWabiken;
