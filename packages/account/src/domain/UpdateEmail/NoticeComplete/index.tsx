import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => (
  <NoticePage
    title="メールアドレスの変更"
    texts="変更が完了しました。"
    links={[
      {
        href: '/',
        label: 'ホーム',
      },
    ]}
  />
);

export default NoticeComplete;
