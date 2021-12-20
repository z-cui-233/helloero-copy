import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.helloero.entry.complete.title}
      texts={lang.helloero.entry.complete.text}
      links={[
        {
          href: `/${locale}/my-library`,
          label: lang.helloero.entry.complete.home,
        },
      ]}
    />
  );
};

export default NoticeComplete;
