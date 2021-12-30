import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      texts={lang.account.updateEmail.complete.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.updateEmail.complete.home,
        },
      ]}
    />
  );
};

export default NoticeComplete;
