import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Logo from '../../../../assets/logo/helloeroBlack.svg';

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
    left: 1rem;
    bottom: 0;
    margin: auto;
    height: 2.5rem;
    width: auto;
    display: block;
  }
`;

export default SiteLogo;
