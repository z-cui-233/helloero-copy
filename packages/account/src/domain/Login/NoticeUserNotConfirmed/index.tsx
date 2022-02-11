import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeUserNotConfirmed: React.FC = () => {
  return (
    <NoticePage
      texts="アカウント登録が完了していません。メールアドレスの確認をしてアカウント登録を完了してください。"
      links={[
        {
          href: '/resend-signup',
          label: 'メールアドレスの確認',
        },
      ]}
    />
  );
};

export default NoticeUserNotConfirmed;
