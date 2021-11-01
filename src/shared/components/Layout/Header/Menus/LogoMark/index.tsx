import React from 'react';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import Logo from '../../../../../assets/logo/ColorFullRed.svg';

const LogoMark: React.FC = () => {
  return <StyledLogo />;
};

const StyledLogo = styled(Logo)`
  &&& {
    transform-origin: center;
    transform: rotate(-90deg);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: auto;
    width: 100%;
    display: block;

    @media ${device.ltSd} {
      transform: rotate(0deg);
    }
  }
`;

export default LogoMark;
