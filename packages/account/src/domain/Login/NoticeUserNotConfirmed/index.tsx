import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeUserNotConfirmed: React.FC = () => {
  return (
    <NoticePage
      title="ログインできません。"
      texts={[
        'アカウント登録が完了していないため、ログインできません。',
        'メールアドレスの確認をしてアカウント登録を完了してください。',
      ]}
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
