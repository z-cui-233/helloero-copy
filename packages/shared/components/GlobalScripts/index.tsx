import React, { useEffect } from 'react';
import Script from 'next/script';
import { CustomWindow, GTagConfig } from 'u-next/window';
import Router, { useRouter } from 'next/router';

const GA_MEASUREMENT_ID = 'G-81ZW4FPFG7';

const GlobalScripts: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (): void => {
      const gtagParams: GTagConfig = {
        page_title: window.document.title,
        page_location: window.location.href,
      };

      (window as CustomWindow).gtag('config', GA_MEASUREMENT_ID, gtagParams);
    };

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.pathname]);

  return (
    <React.Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          (window as CustomWindow).dataLayer =
            (window as CustomWindow).dataLayer || [];

          (window as CustomWindow).gtag = function () {
            // eslint-disable-next-line prefer-rest-params
            (window as CustomWindow).dataLayer.push(arguments);
          };
          (window as CustomWindow).gtag('js', new Date());
          (window as CustomWindow).gtag('config', GA_MEASUREMENT_ID);
        }}
      />
    </React.Fragment>
  );
};

export default GlobalScripts;
