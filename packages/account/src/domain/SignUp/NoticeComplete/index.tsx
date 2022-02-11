import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      texts="登録が完了しました"
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
