import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => (
  <NoticePage
    title="H2Uアカウントの削除が完了しました"
    texts={[
      'U-NEXTをご利用いただきありがとうございました。',
      'またのご利用を心よりお待ちしております。',
    ]}
    links={[
      {
        href: '/',
        label: 'ホーム',
      },
    ]}
  />
);

export default NoticeComplete;
