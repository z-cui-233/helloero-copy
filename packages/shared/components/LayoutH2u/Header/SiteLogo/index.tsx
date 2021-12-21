import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../../../../assets/logo/h2uRed.svg';
import { useLocale } from '../../../../context/LocaleContext';

const SiteLogo: React.FC = () => {
  const { locale } = useLocale();

  return (
    <Link href={`/${locale}`} passHref>
      <a>
        <StyledLogo />
      </a>
    </Link>
  );
};

const StyledLogo = styled(Logo)`
  &&& {
    position: absolute;
    top: 0;
    left: 0.5rem;
    bottom: 0;
    margin: auto;
    height: 2.5rem;
    width: auto 0;
    display: block;
  }
`;

export default SiteLogo;