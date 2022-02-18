import React from 'react';
import { globalConfig } from 'src/globalConfig';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => (
  <NoticePage
    title="お問い合わせを受け付けました。"
    texts={[
      'ご指定のメールアドレスに回答を送信します。',
      '回答までに数日かかる場合があります。今しばらくお待ちください。',
    ]}
    links={[
      {
        href: globalConfig.ACCOUNT,
        label: 'ホーム',
      },
    ]}
  />
);

export default NoticeComplete;
