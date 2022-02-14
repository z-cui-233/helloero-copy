import React from 'react';
import { globalConfig } from 'src/globalConfig';
import NoticePage from '@/shared/components/NoticePage';

const NoticeComplete: React.FC = () => (
  <NoticePage
    title="アカウント登録"
    texts="登録が完了しました"
    links={[
      {
        href: globalConfig.HELLOERO,
        label: 'HELLOEROに進む',
      },
    ]}
  />
);

export default NoticeComplete;
