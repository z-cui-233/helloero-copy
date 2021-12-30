import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeUserNotConfirmed: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      texts={lang.account.login.notConfirmed.text}
      links={[
        {
          href: `/${locale}/resend-signup`,
          label: lang.account.login.notConfirmed.button,
        },
      ]}
    />
  );
};

export default NoticeUserNotConfirmed;
