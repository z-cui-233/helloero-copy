import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import langJa from '../i18n/ja';
import langEn from '../i18n/en';
import { LocaleData } from 'u-next/locales';

const LOCALES = ['ja', 'en'] as const;
export type localeType = typeof LOCALES[number];

interface ContextProps {
  locale: localeType;
  locales: typeof LOCALES;
  lang: LocaleData;
}

const LocaleContext: React.Context<ContextProps> = React.createContext(
  {} as ContextProps
);

const LocaleProvider: React.FC = ({ children }) => {
  const locale = useRouter().locale as localeType;

  const lang = locale === LOCALES[0] ? langJa : langEn;

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
