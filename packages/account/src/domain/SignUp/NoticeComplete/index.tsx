import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      texts={lang.account.signUp.step3.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.signUp.step3.button,
        },
      ]}
    />
  );
};

export default NoticeComplete;
