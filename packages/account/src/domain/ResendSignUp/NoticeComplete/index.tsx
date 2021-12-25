import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.resendSignUpStep3.title}
      texts={lang.account.resendSignUpStep3.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.resendSignUpStep3.button,
        },
      ]}
    />
  );
};

export default NoticeComplete;
