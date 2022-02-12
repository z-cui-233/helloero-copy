import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticePasswordResetRequired: React.FC = () => {
  return (
    <NoticePage
      title="ログインできません。"
      texts="このアカウントはパスワードリセットされています。パスワードを再設定してください。"
      links={[
        {
          href: '/reset-password',
          label: 'パスワードの変更',
        },
      ]}
    />
  );
};

export default NoticePasswordResetRequired;
