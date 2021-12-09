import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CreateUserWabikenMetaInput, GetWabikenMetaQuery } from 'src/API';
import { activateWabiken, createUserWabikenMeta } from 'src/graphql/mutations';
import { getWabikenMeta } from 'src/graphql/queries';
import { API_VERSION } from 'src/shared/constants';
import { errorMessages } from 'src/shared/constants/errorMessages';
import { useLoginStateContext } from 'src/shared/context/LoginStateContext';
import { GraphQLResultEx } from 'src/types/amplify';

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

const useEntryWabiken = (): UseEntryWabiken => {
  const router = useRouter();
  const { userInfo } = useLoginStateContext();
  const [entryWabikenState, setEntryWabikenState] = useState<
    UseEntryWabiken['entryWabikenState']
  >({
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

    setEntryWabikenState((entryWabikenState) => ({
      ...entryWabikenState,
      formValues: {
        wabiken,
      },
      pageStatus: PAGE_STATUS.INPUT,
    }));
  }, [router.query.wabiken]);

  const confirmWabiken = async (
    values: UseEntryWabiken['entryWabikenState']['formValues']
  ): Promise<void> => {
    const wabiken = values.wabiken;

    try {
      const getWabikenMetaQueryResponse = (await API.graphql(
        graphqlOperation(getWabikenMeta, {
          id: wabiken,
        })
      )) as GraphQLResult<GetWabikenMetaQuery>;

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        pageStatus: PAGE_STATUS.CONFIRM,
        errorMessage: '',
        formValues: {
          wabiken,
        },
        getWabikenMetaQuery: getWabikenMetaQueryResponse.data ?? null,
      }));
    } catch (error) {
      const errorCode = (error as GraphQLResultEx<GetWabikenMetaQuery>)
        .errors?.[0]?.errorInfo?.code;

      const errorMessage =
        errorMessages.getWabikenMeta[errorCode?.toString()] ??
        errorMessages.default;

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        pageStatus: PAGE_STATUS.INPUT,
        errorMessage,
        formValues: {
          wabiken,
        },
      }));
    }
  };

  const consumeWabiken = async (): Promise<void> => {
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

    const activateWabikenData = {
      token: entryWabikenState.formValues.wabiken,
      lockTo,
    };

    const createUserWabikenMetaInputData: CreateUserWabikenMetaInput = {
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
    };

    try {
      // 1. consume wabiken
      await API.graphql(graphqlOperation(activateWabiken, activateWabikenData));
    } catch (error) {
      const errorCode = (error as GraphQLResultEx<GetWabikenMetaQuery>)
        .errors?.[0]?.errorInfo?.code;

      const errorMessage =
        errorMessages.activateWabiken[errorCode?.toString()] ??
        errorMessages.default;

      setEntryWabikenState((entryWabikenState) => ({
        ...entryWabikenState,
        errorMessage,
      }));
      return;
    }

    try {
      // 2. save dynamoDb
      await API.graphql(
        graphqlOperation(createUserWabikenMeta, {
          input: createUserWabikenMetaInputData,
        })
      );
    } catch (error) {
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
  };

  return {
    entryWabikenState,
    confirmWabiken,
    consumeWabiken,
  };
};

export default useEntryWabiken;
