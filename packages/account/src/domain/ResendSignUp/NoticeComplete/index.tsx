import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      title="アカウント登録の再開"
      texts="アカウントの登録が完了しました。"
      links={[
        {
          href: '/',
          label: 'ホーム',
        },
      ]}
    />
  );
};

export default NoticeComplete;
