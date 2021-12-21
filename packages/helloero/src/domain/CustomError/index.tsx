import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';

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
    <LayoutHelloero options={globalConfig}>
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
    </LayoutHelloero>
  );
};

export default CustomError;
