import React from 'react';
import NoticePage from '@/shared/components/NoticePage';
import { useLocale } from '@/shared/context/LocaleContext';

const NoticeUserNotConfirmed: React.FC = () => {
  const { locale, lang } = useLocale();

  return (
    <NoticePage
      title={lang.account.loginNotConfirmed.title}
      texts={lang.account.loginNotConfirmed.text}
      links={[
        {
          href: `/${locale}/resend-signup`,
          label: lang.account.loginNotConfirmed.button,
        },
      ]}
    />
  );
};

export default NoticeUserNotConfirmed;
