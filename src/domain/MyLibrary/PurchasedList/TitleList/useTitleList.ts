import { useRouter } from 'next/router';
import { useState } from 'react';

export interface UseTitleList {
  state: {
    isShownDetail: boolean;
    wabiken: string;
  };
  goToPlay: (wabiken: string) => void;
  openTitleDetail: (wabiken: string) => void;
  closeTitleDetail: () => void;
}

const useTitleList = () => {
  const router = useRouter();

  const [state, setState] = useState<UseTitleList['state']>({
    isShownDetail: false,
    wabiken: '',
  });

  const goToPlay: UseTitleList['goToPlay'] = (wabiken) => {
    router.push(`/play?wabiken=${wabiken}`);
  };

  const openTitleDetail: UseTitleList['openTitleDetail'] = (wabiken) => {
    setState((state) => ({
      ...state,
      isShownDetail: true,
      wabiken,
    }));
  };

  const closeTitleDetail: UseTitleList['closeTitleDetail'] = () => {
    setState((state) => ({
      ...state,
      isShownDetail: false,
      wabiken: '',
    }));
  };

  return {
    state,
    goToPlay,
    openTitleDetail,
    closeTitleDetail,
  };
};

export default useTitleList;
