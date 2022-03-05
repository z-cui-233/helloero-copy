import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import Landing from './Landing';
import useTop from './useTop';

const Top: React.FC = () => {
  const { isInitialized } = useTop();

  return (
    <LayoutHelloero options={globalConfig}>
      {isInitialized ? <Landing /> : null}
    </LayoutHelloero>
  );
};

export default Top;
