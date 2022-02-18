import React from 'react';
import { globalConfig } from 'src/globalConfig';
import NoticePage from '@/shared/components/NoticePage';
import LayoutH2u from '@/shared/components/LayoutH2u';

type Props = {
  statusCode: number;
};

const CustomError: React.FC<Props> = ({ statusCode }) => {
  const title =
    statusCode === 404
      ? 'お探しのページが見つかりません'
      : '予期せぬエラーが発生しました';

  const texts =
    statusCode === 404
      ? [
          '入力したアドレスが間違っているか、ページが移動した可能性があります。',
          `（${statusCode}）`,
        ]
      : [
          'サーバへのアクセスが混み合っているか、メンテナンス中の可能性があります。しばらく時間をおいてから、もう一度アクセスしてください。',
          `（${statusCode}）`,
        ];

  return (
    <LayoutH2u options={globalConfig}>
      <NoticePage
        title={title}
        texts={texts}
        links={[
          {
            href: '/',
            label: 'ホーム',
          },
        ]}
      />
    </LayoutH2u>
  );
};

export default CustomError;
