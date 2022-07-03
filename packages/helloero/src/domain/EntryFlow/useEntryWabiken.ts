import dateFormat from 'dateformat';
import { destroyCookie, parseCookies } from 'nookies';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import { cookieParams } from '@/shared/constants/cookies';
import { MESSAGES } from '@/shared/constants/messages';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyFetcher from '@/shared/hooks/useAmplifyFetcher';
import useTdBridge from '@/shared/hooks/useTdBridge';
import { getErrorMessage } from '@/shared/utils';
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

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  CONFIRM: 'CONFIRM',
  WAITING: 'WAITING',
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
  waitComplete: () => void;
};

const isCreateUserWabikenMetaInput = (
  input: WabikenMeta | CreateUserWabikenMetaInput | undefined
): input is CreateUserWabikenMetaInput => {
  return !!(
    input &&
    (input as CreateUserWabikenMetaInput).contentDisplayName &&
    (input as CreateUserWabikenMetaInput).contentDisplayNameKana &&
    input.activatedAt &&
    input.content &&
    input.content.key &&
    input.content.thumbnails
  );
};

const useEntryWabiken = (): UseEntryWabiken => {
  const [state, setState] = React.useState<State>(initialState);
  const { fetcher: tdBridgeFetcher } = useTdBridge();
  const { userInfo } = useLoginStateContext();

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

  const confirmWabiken: UseEntryWabiken['confirmWabiken'] = React.useCallback(
    async (values) => {
      if (getWabikenMetaQueryLoading) {
        return;
      }

      const apiData = await getWabikenMetaQueryFetcher(getWabikenMeta, {
        id: values.wabiken,
      });

      if (apiData.errors) {
        setState((prevState) => ({
          ...prevState,
          pageStatus: PAGE_STATUS.INPUT,
          errorMessage: getErrorMessage(
            'getWabikenMeta',
            apiData.errors?.[0]?.errorInfo?.code
          ),
          formValues: values,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: values,
        getWabikenMetaQuery: apiData.data ?? null,
      }));
    },
    [getWabikenMetaQueryFetcher, getWabikenMetaQueryLoading]
  );

  const consumeWabiken: UseEntryWabiken['consumeWabiken'] =
    React.useCallback(async () => {
      if (activateWabikenLoading || createUserWabikenMetaLoading) {
        return;
      }

      const getWabikenMeta = state.getWabikenMetaQuery
        ?.getWabikenMeta as GetWabikenMetaQuery['getWabikenMeta'];

      if (!getWabikenMeta) {
        setState((prevState) => ({
          ...prevState,
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
        contentDisplayNameKana: getWabikenMeta.wabiken.content.displayNameKana,
      };

      if (
        activateWabikenApiData.errors ||
        !isCreateUserWabikenMetaInput(createWabikenInput)
      ) {
        setState((prevState) => ({
          ...prevState,
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
        setState((prevState) => ({
          ...prevState,
          errorMessage: MESSAGES.default,
        }));
        return;
      }

      // 3. send TD log
      try {
        await tdBridgeFetcher(globalConfig, 'serial_code_activate_log', {
          action_time: dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss'),
          user_unique_key: userInfo.customUserId,
          user_multi_account_id: null,
          super_user_flg: 0,
          market_platform: 'amazon',
          provider_id: getWabikenMeta.wabiken.content.key.providerId,
          product_code: null,
          content_id_1: getWabikenMeta.wabiken.content.id,
          content_id_2: null,
          content_id_3: null,
          sale_type_code:
            getWabikenMeta.wabiken.validityPeriod === 0 ? 'EST' : 'TVOD',
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }

      destroyCookie(null, cookieParams.wabiken.name, {
        domain: globalConfig.COOKIE_DOMAIN,
        path: cookieParams.wabiken.path,
      });

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.WAITING,
      }));
    }, [
      activateWabikenFetcher,
      activateWabikenLoading,
      createUserWabikenMetaFetcher,
      createUserWabikenMetaLoading,
      state.formValues.wabiken,
      state.getWabikenMetaQuery?.getWabikenMeta,
      tdBridgeFetcher,
      userInfo.customUserId,
    ]);

  // WF-9467 dynamoDBの書き込みが遅いため、少し待ってから移動させる
  const waitComplete: UseEntryWabiken['waitComplete'] =
    React.useCallback(() => {
      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.COMPLETE,
      }));
    }, []);

  React.useEffect(() => {
    (async () => {
      if (state.pageStatus !== PAGE_STATUS.INIT) {
        return;
      }

      const cookies = parseCookies();
      const wabiken = cookies[cookieParams.wabiken.name]
        ? (cookies[cookieParams.wabiken.name] as string)
        : '';

      setState((prevState) => ({
        ...prevState,
        pageStatus: PAGE_STATUS.INPUT,
        formValues: {
          wabiken,
        },
      }));
    })();
  }, [state.pageStatus]);

  return {
    entryWabikenState: state,
    confirmWabiken,
    consumeWabiken,
    waitComplete,
  };
};

export default useEntryWabiken;
