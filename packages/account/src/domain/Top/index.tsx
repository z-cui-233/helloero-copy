import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutH2u from '@/shared/components/LayoutH2u';
import Link from 'next/link';
import { useLocale } from '@/shared/context/LocaleContext';
import withAmplifyAuth from '@/shared/hocs/withAmplifyAuth';
import MainContainer from '@/shared/components/parts/MainContainer';

const Top: React.FC = () => {
  const { locale } = useLocale();
  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer>
        <div>
          <Link href={`/${locale}/update-email`} passHref>
            <a>メールアドレスの変更</a>
          </Link>
        </div>
        <div>
          <Link href={`/${locale}/reset-password`} passHref>
            <a>パスワードの変更</a>
          </Link>
        </div>
      </MainContainer>
    </LayoutH2u>
  );
};

export default withAmplifyAuth(Top, globalConfig);
