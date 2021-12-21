import React from 'react';
import Landing from './Landing';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import { globalConfig } from 'src/globalConfig';
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
