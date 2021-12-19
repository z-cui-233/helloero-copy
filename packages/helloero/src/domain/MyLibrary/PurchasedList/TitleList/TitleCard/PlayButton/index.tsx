import React from 'react';
import styled from 'styled-components';
import Icon from '@/shared/assets/icon/play_arrow.svg';

interface Props {
  onClick: () => void;
}

const PlayButton: React.FC<Props> = ({ onClick }) => (
  <Container onClick={onClick}>
    <StyledIcon />
  </Container>
);

const Container = styled.div`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 3rem;
  margin: auto;

  background-color: ${({ theme }) => theme.foreground.secondary};
  content: '';
  display: block;
  border-radius: 50%;

  &:after {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 2px solid ${({ theme }) => theme.background.primary};
    content: '';
    display: block;
    border-radius: 50%;
    transition: border 0.2s ease-out;
  }

  &:hover {
    &:after {
      border: 2px solid ${({ theme }) => theme.keyColor.color1};
    }

    svg path {
      fill: ${({ theme }) => theme.keyColor.color1};
    }
  }
`;

const StyledIcon = styled(Icon)`
  &&& {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    margin: auto;
    height: 2.5rem;
    width: 2.5rem;
    display: block;

    path {
      transition: fill 0.2s ease-out;
    }
  }
`;

export default PlayButton;
