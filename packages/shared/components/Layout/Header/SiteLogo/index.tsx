import React from 'react';
import styled from 'styled-components';
import Logo from '../../../../../shared/assets/logo/ColorBlack.svg';
import device from '../../../../../shared/styles/device';
import Link from 'next/link';

const SiteLogo: React.FC = () => {
  return (
    <Link href="/" passHref>
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
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 2.5rem;
    width: auto;
    display: block;

    @media ${device.ltSd} {
      right: auto;
      left: 1rem;
    }
  }
`;

export default SiteLogo;
