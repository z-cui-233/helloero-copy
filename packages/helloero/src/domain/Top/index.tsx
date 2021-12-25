import React from 'react';
import { globalConfig } from 'src/globalConfig';
import Landing from './Landing';
import useTop from './useTop';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

const Top: React.FC = () => {
  const { isInitialized } = useTop();

  return (
    <LayoutHelloero options={globalConfig}>
      {isInitialized ? <Landing /> : null}
    </LayoutHelloero>
  );
};

export default Top;
