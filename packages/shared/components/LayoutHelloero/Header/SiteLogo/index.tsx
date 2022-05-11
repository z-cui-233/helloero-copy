import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Logo from '../../../../assets/logo/helloeroBlack.svg';
import device from '../../../../styles/device';

const SiteLogo: React.FC = () => (
  <Link href="/" passHref>
    <a>
      <StyledLogo />
    </a>
  </Link>
);

const StyledLogo = styled(Logo)`
  &&& {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: auto;
    width: 8rem;
    display: block;

    @media ${device.ltTablet} {
      left: 4.5rem;
      right: auto;
    }
  }
`;

export default SiteLogo;
