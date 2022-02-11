import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      texts="変更が完了しました"
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
