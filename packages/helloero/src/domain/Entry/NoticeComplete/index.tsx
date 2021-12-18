import React from 'react';
import NoticePage from '../../../shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      title="動画を登録しました"
      texts={[
        '引き続き、HELLOEROをお楽しみ下さい。',
        '有効期限がある場合、作品詳細で確認ができます。',
      ]}
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
