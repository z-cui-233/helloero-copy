import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import BigBar from '@/shared/components/BigBar';

const TermsPrivacy: React.FC = () => {
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title={lang.help.termsPrivacy.title} />
      <MainContainer>TermsPrivacy</MainContainer>
    </LayoutH2u>
  );
};

export default TermsPrivacy;