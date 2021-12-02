import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  };
  confirmWabiken: (values: UseEntryWabiken['state']['formValues']) => void;
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

  const confirmWabiken = (
    values: UseEntryWabiken['state']['formValues']
  ): void => {
    const wabiken = values.wabiken;
    const errorMessage =
      wabiken === 'ABCDABCDABCDABCD'
        ? '予期せぬエラーが発生しました。もう一度お試しください。'
        : '';
    setState((state) => ({
      ...state,
      pageStatus: errorMessage !== '' ? PAGE_STATUS.INPUT : PAGE_STATUS.CONFIRM,
      errorMessage,
      formValues: {
        wabiken,
      },
    }));
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
