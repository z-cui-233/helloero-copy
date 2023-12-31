import React from 'react';
import styled from 'styled-components';
import Logo from '../../../../../assets/logo/helloeroFullRed.svg';
import LogoRotate from '../../../../../assets/logo/helloeroFullRedRotate.svg';
import device from '../../../../../styles/device';

const LogoMark: React.FC = () => (
  <Container>
    <BackGroundColor>
      <LogoRotateContainer>
        <StyledLogoRotate />
      </LogoRotateContainer>
      <LogoContainer>
        <StyledLogo />
      </LogoContainer>
    </BackGroundColor>
  </Container>
);

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;

  @media ${device.ltSd} {
    padding: 4rem 2rem;
  }
`;

const BackGroundColor = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color2};
  width: 100%;
  height: 100%;
  position: relative;

  @media ${device.ltSd} {
    padding: 4rem 0;
    height: auto;
  }
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
    display: block;
  }
`;

const StyledLogo = styled(Logo)`
  &&& {
    margin: 0 auto;
    height: auto;
    width: 100%;
    display: block;
  }
`;

export default LogoMark;
