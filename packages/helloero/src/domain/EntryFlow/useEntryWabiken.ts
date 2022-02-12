import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { destroyCookie, parseCookies } from 'nookies';
import { globalConfig } from 'src/globalConfig';
import {
  ActivateWabikenMutation,
  ActivateWabikenMutationVariables,
  CreateUserWabikenMetaInput,
  CreateUserWabikenMetaMutation,
  CreateUserWabikenMetaMutationVariables,
  GetWabikenMetaQuery,
  GetWabikenMetaQueryVariables,
  WabikenMeta,
} from '../../API';
import {
  activateWabiken,
  createUserWabikenMeta,
} from '../../graphql/mutations';
import { getWabikenMeta } from '../../graphql/queries';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { getErrorMessage } from '@/shared/utils';
import { cookieParams } from '@/shared/constants/cookies';
import { MESSAGES } from '@/shared/constants/messages';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    wabiken: string;
  };
  getWabikenMetaQuery: GetWabikenMetaQuery | null;
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  formValues: {
    wabiken: '',
  },
  getWabikenMetaQuery: null,
};

export type UseEntryWabiken = {
  entryWabikenState: State;
  confirmWabiken: (values: State['formValues']) => Promise<void>;
  consumeWabiken: () => Promise<void>;
};

const isCreateUserWabikenMetaInput = (
  input: WabikenMeta | CreateUserWabikenMetaInput | undefined
): input is CreateUserWabikenMetaInput => {
  return !!(
    input &&
    (input as CreateUserWabikenMetaInput).contentDisplayName &&
    input.activatedAt &&
    input.content &&
    input.content.key &&
    input.content.thumbnails
  );
};

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();
  const [state, setState] = useState<State>(initialState);

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
        setState((state) => ({
          ...state,
          pageStatus: PAGE_STATUS.INPUT,
          errorMessage: getErrorMessage(
            'getWabikenMeta',
            apiData.errors?.[0]?.errorInfo?.code
          ),
          formValues: values,
        }));
        return;
      }

      setState((state) => ({
        ...state,
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

      const getWabikenMeta = state.getWabikenMetaQuery
        ?.getWabikenMeta as GetWabikenMetaQuery['getWabikenMeta'];

      if (!getWabikenMeta) {
        setState((state) => ({
          ...state,
          errorMessage: MESSAGES.default,
        }));
        return;
      }

      // 1. consume wabiken
      const activateWabikenApiData = await activateWabikenFetcher(
        activateWabiken,
        {
          id: state.formValues.wabiken,
        }
      );

      const createWabikenInput = getWabikenMeta?.wabiken && {
        ...getWabikenMeta?.wabiken,
        activatedAt:
          activateWabikenApiData.data?.activateWabiken?.wabiken.activatedAt,
        notValidAfter: activateWabikenApiData.data?.activateWabiken?.wabiken
          .notValidAfter as number,
        contentDisplayName: getWabikenMeta.wabiken.content.displayName,
      };

      if (
        activateWabikenApiData.errors ||
        !isCreateUserWabikenMetaInput(createWabikenInput)
      ) {
        setState((state) => ({
          ...state,
          errorMessage: getErrorMessage(
            'activateWabiken',
            activateWabikenApiData.errors?.[0]?.errorInfo?.code
          ),
        }));
        return;
      }

      // 2. save dynamoDb
      const createUserWabikenMetaApiData = await createUserWabikenMetaFetcher(
        createUserWabikenMeta,
        {
          input: createWabikenInput,
        }
      );

      if (createUserWabikenMetaApiData.errors) {
        setState((state) => ({
          ...state,
          errorMessage: MESSAGES.default,
        }));
        return;
      }

      destroyCookie(null, cookieParams.wabiken.name, {
        domain: globalConfig.COOKIE_DOMAIN,
        path: cookieParams.wabiken.path,
      });

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.COMPLETE,
      }));
    }, [
      activateWabikenFetcher,
      activateWabikenLoading,
      createUserWabikenMetaFetcher,
      createUserWabikenMetaLoading,
      state.formValues.wabiken,
      state.getWabikenMetaQuery?.getWabikenMeta,
    ]);

  useEffect(() => {
    const cookies = parseCookies();
    const wabiken = cookies[cookieParams.wabiken.name]
      ? (cookies[cookieParams.wabiken.name] as string)
      : '';

    setState((entryWabikenState) => ({
      ...entryWabikenState,
      pageStatus: PAGE_STATUS.INPUT,
      formValues: { wabiken },
    }));
  }, [router.query.wabiken]);

  return {
    entryWabikenState: state,
    confirmWabiken,
    consumeWabiken,
  };
};

export default useEntryWabiken;
