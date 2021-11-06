import React from 'react';
import NoticePage from 'src/shared/components/atomic/group/NoticePage';
import withLayout from 'src/shared/components/Layout';

interface Props {
  statusCode: number;
}

const CustomError: React.FC<Props> = ({ statusCode }) => {
  const title =
    statusCode === 404
      ? 'お探しのページが見つかりません'
      : '予期せぬエラーが発生しました';

  const texts =
    statusCode === 404
      ? '入力したアドレスが間違っているか、ページが移動した可能性があります。'
      : [
          'サーバへのアクセスが混み合っているか、メンテナンス中の可能性があります。',
          'しばらく時間をおいてから、もう一度アクセスしてください。',
        ];

  return (
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
  );
};

export default withLayout(CustomError);
