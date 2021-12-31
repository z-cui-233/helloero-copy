import React from 'react';
import { globalConfig } from 'src/globalConfig';
import MenuCard from './MenuCard';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import BigBar from '@/shared/components/BigBar';
import { useLocale } from '@/shared/context/LocaleContext';

const HelpTop: React.FC = () => {
  const { lang } = useLocale();

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar size="large" title={lang.help.top.title} />
      <MainContainer size="large">
        <MenuCard
          urlPattern={'guide'}
          title={lang.help.top.guide.title}
          texts={lang.help.top.guide.text}
        />
        <MenuCard
          urlPattern={'info'}
          title={lang.help.top.info.title}
          texts={lang.help.top.info.text}
        />
        <MenuCard
          urlPattern={'inquiry'}
          title={lang.help.top.inquiry.title}
          texts={lang.help.top.inquiry.text}
        />
      </MainContainer>
    </LayoutH2u>
  );
};

export default HelpTop;
