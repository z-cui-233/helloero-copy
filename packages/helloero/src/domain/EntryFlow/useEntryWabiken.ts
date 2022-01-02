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
import { API_VERSION } from '@/localShared/constants';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import { useLocale } from '@/shared/context/LocaleContext';
import { getErrorMessage } from '@/shared/utils';
import { cookieParams } from '@/shared/constants/cookies';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  COMPLETE: 'COMPLETE',
} as const;

type EntryWabikenState = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  formValues: {
    wabiken: string;
  };
  getWabikenMetaQuery: GetWabikenMetaQuery | null;
};

export type UseEntryWabiken = {
  entryWabikenState: EntryWabikenState;
  confirmWabiken: (values: EntryWabikenState['formValues']) => Promise<void>;
  consumeWabiken: () => Promise<void>;
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
  const { lang } = useLocale();

  const [entryWabikenState, setEntryWabikenState] = useState<EntryWabikenState>(
    {
      pageStatus: PAGE_STATUS.INIT,
      errorMessage: '',
      formValues: {
        wabiken: '',
      },
      getWabikenMetaQuery: null,
    }
  );

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
        const errorMessage = getErrorMessage(
          lang,
          'getWabikenMeta',
          apiData.errors?.[0]?.errorInfo?.code
        );

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
    [getWabikenMetaQueryFetcher, getWabikenMetaQueryLoading, lang]
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
          errorMessage: lang.messages.default,
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
        const errorMessage = getErrorMessage(
          lang,
          'activateWabiken',
          activateWabikenApiData.errors?.[0]?.errorInfo?.code
        );

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
            notValidAfter: activateWabikenApiData.data?.activateWabiken?.wabiken
              .notValidAfter as number,
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
          errorMessage: lang.messages.default,
        }));
        return;
      }

      destroyCookie(null, cookieParams.wabiken.name, {
        domain: globalConfig.COOKIE_DOMAIN,
        path: cookieParams.wabiken.path,
      });

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
      lang,
    ]);

  useEffect(() => {
    const cookies = parseCookies();
    const wabiken = cookies[cookieParams.wabiken.name]
      ? (cookies[cookieParams.wabiken.name] as string)
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
