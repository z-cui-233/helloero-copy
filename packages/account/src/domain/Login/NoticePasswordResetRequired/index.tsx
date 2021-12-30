import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticePasswordResetRequired: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      texts={lang.account.login.passwordResetRequired.text}
      links={[
        {
          href: `/${locale}/reset-password`,
          label: lang.account.login.passwordResetRequired.button,
        },
      ]}
    />
  );
};

export default NoticePasswordResetRequired;
