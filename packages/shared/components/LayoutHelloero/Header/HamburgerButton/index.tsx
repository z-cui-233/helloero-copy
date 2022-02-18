import React from 'react';
import styled from 'styled-components';

type Props = {
  isDisplayedMenu: boolean;
  onClick: () => void;
};

const HamburgerButton: React.FC<Props> = ({ isDisplayedMenu, onClick }) => {
  return (
    <Container tabIndex={0} onClick={onClick} isDisplayedMenu={isDisplayedMenu}>
      <TopLine isDisplayedMenu={isDisplayedMenu} />
      <CenterLine isDisplayedMenu={isDisplayedMenu} />
      <BottomLine isDisplayedMenu={isDisplayedMenu} />
    </Container>
  );
};

const Container = styled.div<{ isDisplayedMenu: boolean }>`
  background-color: ${({ theme, isDisplayedMenu }) =>
    isDisplayedMenu ? theme.keyColor.color3 : theme.background.primaryInverted};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 4rem;
  height: 4rem;
  z-index: 1000;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, isDisplayedMenu }) =>
      isDisplayedMenu ? theme.keyColor.color3 : theme.keyColor.color1};
  }
`;

const TopLine = styled.div<{ isDisplayedMenu: boolean }>`
  content: '';
  display: block;
  background-color: ${({ theme, isDisplayedMenu }) =>
    isDisplayedMenu ? theme.keyColor.color1 : theme.background.primary};
  height: 2px;
  width: 2rem;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;

  transition: transform 0.3s ease;

  ${({ isDisplayedMenu }) =>
    isDisplayedMenu ? `transform: translateY(0.45rem) rotate(-45deg);` : ``};
`;

const CenterLine = styled.div<{ isDisplayedMenu: boolean }>`
  background-color: ${({ theme, isDisplayedMenu }) =>
    isDisplayedMenu ? theme.keyColor.color1 : theme.background.primary};
  height: 2px;
  width: 2rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  transition: opacity 0.3s ease;

  opacity: ${({ isDisplayedMenu }) => (isDisplayedMenu ? '0' : '1')};
`;

const BottomLine = styled.div<{ isDisplayedMenu: boolean }>`
  content: '';
  display: block;
  background-color: ${({ theme, isDisplayedMenu }) =>
    isDisplayedMenu ? theme.keyColor.color1 : theme.background.primary};
  height: 2px;
  width: 2rem;
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;

  transition: transform 0.3s ease;

  ${({ isDisplayedMenu }) =>
    isDisplayedMenu ? `transform: translateY(-0.45rem) rotate(45deg);` : ``};
`;

export default HamburgerButton;
