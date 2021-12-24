import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../../../../assets/logo/h2uRed.svg';
import { useLocale } from '../../../../context/LocaleContext';
import { Config } from 'u-next/config';

interface Props {
  options: Config;
}

const SiteLogo: React.FC<Props> = ({ options }) => {
  const { locale } = useLocale();

  return (
    <Link href={`${options.ACCOUNT}/${locale}`} passHref>
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
    left: 1rem;
    bottom: 0;
    margin: auto;
    height: 2.5rem;
    width: auto 0;
    display: block;
  }
`;

export default SiteLogo;
