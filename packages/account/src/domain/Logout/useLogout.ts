import { useLocale } from '@/shared/context/LocaleContext';
import { Auth, Hub } from 'aws-amplify';
import { useCallback, useState } from 'react';

interface UseLogout {
  invokeLogOut: () => Promise<void>;
  isLoading: boolean;
}

const useLogout = (): UseLogout => {
  const { locale } = useLocale();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const invokeLogOut: UseLogout['invokeLogOut'] =
    useCallback(async (): Promise<void> => {
      if (isLoading) {
        return;
      }

      try {
        await Auth.signOut();
        Hub.dispatch('UI Auth', {
          event: 'AuthStateChange',
          message: 'signedout',
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setIsLoading(true);
        location.replace(`/${locale}`);
      }
    }, [isLoading, locale]);

  return {
    invokeLogOut,
    isLoading,
  };
};

export default useLogout;
