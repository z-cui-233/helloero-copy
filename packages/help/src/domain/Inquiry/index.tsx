import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import MainContainer from '@/shared/components/parts/MainContainer';
import { useLocale } from '@/shared/context/LocaleContext';
import BigBar from '@/shared/components/BigBar';
import BreadcrumbsList, {
  Breadcrumbs,
} from '@/localShared/components/BreadcrumbsList';

const Inquiry: React.FC = () => {
  const { locale, lang } = useLocale();

  const breadcrumbs: Breadcrumbs[] = [
    {
      path: `/${locale}`,
      text: lang.help.top.title,
    },
    {
      path: `/${locale}/inquiry`,
      text: lang.help.inquiry.title,
    },
  ];

  return (
    <LayoutH2u options={globalConfig}>
      <BigBar title={lang.help.inquiry.title} />
      <MainContainer>
        <BreadcrumbsList breadcrumbs={breadcrumbs} />
        <div>Inquiry</div>
      </MainContainer>
    </LayoutH2u>
  );
};

export default Inquiry;
