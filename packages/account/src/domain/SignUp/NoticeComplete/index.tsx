import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => (
  <NoticePage
    title="アカウント登録"
    texts="登録が完了しました"
    links={[
      {
        href: '/',
        label: 'ホーム',
      },
    ]}
  />
);

export default NoticeComplete;
