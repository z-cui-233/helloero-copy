import { useCallback, useEffect, useState } from 'react';
import { InquiryApiRequest } from 'src/pages/api/inquiry';
import { ApiResponse } from 'u-next/api';
import { INQUIRY_TYPE_MAP } from '@/localShared/constants/inquiry';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';
import useVariousFetch from '@/shared/hooks/useVariousFetcher';

export const PAGE_STATUS = {
  INIT: 'INIT',
  INPUT: 'INPUT',
  COMPLETE: 'COMPLETE',
} as const;

type State = {
  pageStatus: typeof PAGE_STATUS[keyof typeof PAGE_STATUS];
  errorMessage: string;
  isLoggedIn: boolean;
  formValues: InquiryApiRequest;
};

const initialState: State = {
  pageStatus: PAGE_STATUS.INIT,
  errorMessage: '',
  isLoggedIn: false,
  formValues: {
    inquiryType: INQUIRY_TYPE_MAP.keys().next().value,
    detail: '',
    contactEmail: '',
    registeredEmail: '',
  },
};

export type UseInquiry = {
  inquiryState: State;
  sendInquiry: (values: State['formValues']) => Promise<void>;
};

const useInquiry = (): UseInquiry => {
  const [state, setState] = useState<State>(initialState);
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { currentAuthenticatedUser } = useAmplifyAuth();
  const { fetcher } = useVariousFetch<ApiResponse>();

  const sendInquiry: UseInquiry['sendInquiry'] = useCallback(
    async (values) => {
      const apiData = await fetcher('/api/inquiry', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      setState((state) => ({
        ...state,
        pageStatus: apiData.result ? PAGE_STATUS.COMPLETE : PAGE_STATUS.INPUT,
        errorMessage: apiData.errorMessage,
        formValues: values,
      }));
    },
    [fetcher]
  );

  useEffect(() => {
    (async () => {
      if (!isLoadedUserInfo) {
        return;
      }

      const userData = await currentAuthenticatedUser().then(
        (response) => response.data
      );

      setState((state) => ({
        ...state,
        pageStatus: PAGE_STATUS.INPUT,
        isLoggedIn: userInfo.isLoggedIn,
        formValues: {
          ...state.formValues,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          registeredEmail: (userData as any)?.attributes?.email ?? '', // 強引な取得
        },
      }));
    })();
  }, [currentAuthenticatedUser, isLoadedUserInfo, userInfo.isLoggedIn]);

  return {
    inquiryState: state,
    sendInquiry,
  };
};

export default useInquiry;
