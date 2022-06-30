import { useCallback, useState } from 'react';

const DEFAULT_INIT: RequestInit = {
  method: 'GET',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

const useVariousFetch = <T>(): {
  loading: boolean;
  data: T | null;
  fetcher: (input: RequestInfo, init?: RequestInit) => Promise<T>;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetcher = useCallback(
    (input: RequestInfo, init?: RequestInit): Promise<T> => {
      setLoading(true);

      const option = {
        ...DEFAULT_INIT,
        ...init,
      };

      return fetch(input, option)
        .then((response: Response): Promise<T> => {
          return response.json().then((json): T => {
            setData(json);
            return json;
          });
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log((error as Error).message);
          return Promise.reject({} as T);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  return {
    loading,
    data,
    fetcher,
  };
};

export default useVariousFetch;
