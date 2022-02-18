import React from 'react';
import { UseResetPassword } from '../useResetPassword';
import GuestUserForm from './GuestUserForm';
import LoggedInUserForm from './LoggedInUserForm';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';

type Props = {
  resetPasswordState: UseResetPassword['resetPasswordState'];
  sendVerificationCode: UseResetPassword['sendVerificationCode'];
};

const ResetPasswordStep1: React.FC<Props> = (props) => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return !isLoadedUserInfo ? null : userInfo.isLoggedIn ? (
    <LoggedInUserForm {...props} />
  ) : (
    <GuestUserForm {...props} />
  );
};

export default ResetPasswordStep1;
