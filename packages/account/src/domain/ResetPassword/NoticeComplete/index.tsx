import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.resetPassword.complete.title}
      texts={lang.account.resetPassword.complete.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.resetPassword.complete.home,
        },
      ]}
    />
  );
};

export default NoticeComplete;
