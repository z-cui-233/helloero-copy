import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticePasswordResetRequired: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.loginPasswordResetRequired.title}
      texts={lang.account.loginPasswordResetRequired.text}
      links={[
        {
          href: `/${locale}/reset-password`,
          label: lang.account.loginPasswordResetRequired.button,
        },
      ]}
    />
  );
};

export default NoticePasswordResetRequired;
