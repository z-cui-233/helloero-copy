import React from 'react';
import Loading from '@/shared/components/Loading';
import { UseEntryWabiken } from '../useEntryWabiken';

type Props = {
  waitComplete: UseEntryWabiken['waitComplete'];
};

const WaitForCompletion: React.FC<Props> = ({ waitComplete }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => waitComplete(), 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [waitComplete]);

  return <Loading />;
};

export default WaitForCompletion;
