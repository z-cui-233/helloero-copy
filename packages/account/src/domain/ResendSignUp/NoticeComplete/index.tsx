import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      texts={lang.account.resendSignUp.step4.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.resendSignUp.step4.button,
        },
      ]}
    />
  );
};

export default NoticeComplete;
