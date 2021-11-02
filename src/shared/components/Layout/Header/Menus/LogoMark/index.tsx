import React from 'react';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import LogoRotate from '../../../../../assets/logo/ColorFullRedRotate.svg';
import Logo from '../../../../../assets/logo/ColorFullRed.svg';

const LogoMark: React.FC = () => {
  return (
    <Container>
      <LogoRotateContainer>
        <StyledLogoRotate />
      </LogoRotateContainer>
      <LogoContainer>
        <StyledLogo />
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  position: relative;
  width: 100%;
  height: 100%;
`;

const LogoRotateContainer = styled.div`
  display: block;
  @media ${device.ltSd} {
    display: none;
  }
`;

const StyledLogoRotate = styled(LogoRotate)`
  &&& {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    height: 100%;
    width: auto;
    display: block;
  }
`;
const LogoContainer = styled.div`
  display: none;

  @media ${device.ltSd} {
    padding: 4rem 0;
    display: block;
  }
`;

const StyledLogo = styled(Logo)`
  &&& {
    /* position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
    margin: 0 auto;
    height: auto;
    width: 100%;
    display: block;
  }
`;

export default LogoMark;
