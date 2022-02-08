import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { LocaleData, LocaleType } from 'u-next/locales';
import langJa from '../i18n/ja';

const LOCALES = ['ja'] as const;

type ContextProps = {
  locale: LocaleType;
  locales: typeof LOCALES;
  lang: LocaleData;
};

const LocaleContext: React.Context<ContextProps> = React.createContext(
  {} as ContextProps
);

const LocaleProvider: React.FC = ({ children }) => {
  const locale = useRouter().locale as LocaleType;
  const lang = langJa;

  return (
    <LocaleContext.Provider
      value={{
        locale,
        locales: LOCALES,
        lang,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

const useLocale = (): ContextProps => {
  const { locale, locales, lang } = useContext(LocaleContext);

  return {
    locale,
    locales,
    lang,
  };
};

export { useLocale, LocaleProvider };
