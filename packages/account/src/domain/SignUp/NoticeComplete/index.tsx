import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeComplete: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.signUpStep3.title}
      texts={lang.account.signUpStep3.text}
      links={[
        {
          href: `/${locale}`,
          label: lang.account.signUpStep3.button,
        },
      ]}
    />
  );
};

export default NoticeComplete;
