import React from 'react';
import { UseResetPassword } from '../useResetPassword';
import GuestUserForm from './GuestUserForm';
import LoggedInUserForm from './LoggedInUserForm';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

const ResetPasswordStep1: React.FC<UseResetPassword> = (props) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return !isLoadedUserInfo ? null : userInfo.isLoggedIn ? (
    <LoggedInUserForm {...props} />
  ) : (
    <GuestUserForm {...props} />
  );
};

export default ResetPasswordStep1;
