import React from 'react';
import { Config } from 'u-next/config';
import UAParser from 'ua-parser-js';

type UseTdBridge = {
  loading: boolean;
  fetcher: (
    config: Config,
    tableName: 'user_account_log' | 'serial_code_activate_log',
    reqData: Record<string, unknown>
  ) => Promise<void>;
};

const getCommonField = () => {
  const parser = new UAParser();

  return {
    os: parser.getOS().name,
    os_version: parser.getOS().version,
    user_agent: window.navigator.userAgent,
    browser_type: parser.getBrowser().name,
    browser_version: parser.getBrowser().version,
    td_ip: null,
    td_client_id: null,
    td_global_id: null,
  };
};

const useTdBridge = (): UseTdBridge => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetcher: UseTdBridge['fetcher'] = React.useCallback(
    (config, tableName, reqData): Promise<void> => {
      setLoading(true);

      const params = {
        ...getCommonField(),
        ...reqData,
      };

      const objJsonStr = JSON.stringify(params);
      const objJsonB64 = Buffer.from(objJsonStr).toString('base64');
      const encodedObjJsonB64 = encodeURIComponent(objJsonB64);

      return fetch(
        `https://in.h2u.jp/api/v1/${config.TD_DATABASE}/${tableName}?data=${encodedObjJsonB64}`,
        {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            // 'Content-Type': 'application/json',
            'Content-Type': 'text/plain',
          },
        }
      )
        .then((response) => response.json())
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log((error as Error).message);
          return Promise.reject({});
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  return {
    loading,
    fetcher,
  };
};

export default useTdBridge;
