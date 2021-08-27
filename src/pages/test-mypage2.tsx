import { NextPage } from 'next';
import { useSession, signOut, signIn } from 'next-auth/client';
import React from 'react';

const Page: NextPage = () => {
  const [session] = useSession();
  return (
    <div>
      <div>this is test mypage2</div>
      {session ? (
        <div>
          <div>user is = {session?.user?.email}</div>
          <button onClick={() => signOut()}>signOut</button>
        </div>
      ) : (
        <div>
          <div>not logged in</div>
          <button onClick={() => signIn()}>signIn</button>
        </div>
      )}
    </div>
  );
};

export default Page;
