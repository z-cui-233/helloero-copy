import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import withLayout from '@/shared/components/Layout';
import { useLocale } from '@/shared/context/LocaleContext';

interface Props {
  statusCode: number;
}

const CustomError: React.FC<Props> = ({ statusCode }) => {
  const { locale, lang } = useLocale();

  const title =
    statusCode === 404
      ? lang.error.notFound.title
      : lang.error.unexpected.title;

  const texts =
    statusCode === 404
      ? [lang.error.notFound.text, `（${statusCode}）`]
      : [lang.error.unexpected.text, `（${statusCode}）`];

  return (
    <NoticePage
      title={title}
      texts={texts}
      links={[
        {
          href: `/${locale}`,
          label: lang.error.notFound.home,
        },
      ]}
    />
  );
};

export default withLayout(CustomError);
