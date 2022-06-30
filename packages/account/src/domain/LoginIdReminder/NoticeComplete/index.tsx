import React from 'react';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => {
  return (
    <NoticePage
      title="ログインIDの確認"
      texts={[
        'メールを送信しました。',
        'メールが届かない場合、メールアドレスを確認のうえ、再度送信してください。',
      ]}
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
