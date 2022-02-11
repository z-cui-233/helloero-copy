import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      texts="動画を登録しました。有効期限がある場合、作品詳細でも確認できます。"
      links={[
        {
          href: '/my-library',
          label: 'ホーム',
        },
      ]}
    />
  );
};

export default NoticeComplete;
