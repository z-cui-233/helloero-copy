import React from 'react';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import { UseResetPassword } from '../useResetPassword';
import GuestUserForm from './GuestUserForm';
import LoggedInUserForm from './LoggedInUserForm';

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
