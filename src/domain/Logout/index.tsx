import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await Auth.signOut();
        Hub.dispatch('UI Auth', {
          event: 'AuthStateChange',
          message: 'signedout',
        });
        router.replace('/');
      } catch (error) {
        router.replace('/');
      }
    })();
  }, [router]);

  return <div />;
};

export default Logout;
