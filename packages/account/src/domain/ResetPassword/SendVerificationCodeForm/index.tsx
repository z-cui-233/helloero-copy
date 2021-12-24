import React from 'react';
import { UseResetPassword } from '../useResetPassword';
import GuestUserForm from './GuestUserForm';
import LoggedInUserForm from './LoggedInUserForm';

const SendVerificationCodeForm: React.FC<UseResetPassword> = (props) => {
  return props.resetPasswordState.isLogin ? (
    <LoggedInUserForm {...props} />
  ) : (
    <GuestUserForm {...props} />
  );
};

export default SendVerificationCodeForm;
