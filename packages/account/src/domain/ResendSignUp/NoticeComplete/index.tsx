import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.resendSignUpStep4.title}
      texts={lang.account.resendSignUpStep4.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.resendSignUpStep4.button,
        },
      ]}
    />
  );
};

export default NoticeComplete;
