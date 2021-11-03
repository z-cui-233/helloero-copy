import React from 'react';
import styled from 'styled-components';
import Icon from 'src/shared/assets/icon/play_arrow.svg';

const PlayButton: React.FC = () => {
  return (
    <Container>
      <StyledIcon />
    </Container>
  );
};

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

  background-color: ${({ theme }) => theme.filter.primary};
  content: '';
  display: block;
  border-radius: 50%;

  &:after {
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    border: 2px solid ${({ theme }) => theme.background.standard};
    content: '';
    display: block;
    border-radius: 50%;
    transition: border 0.2s ease-out;
  }

  &:hover {
    &:after {
      border: 2px solid ${({ theme }) => theme.background.primary};
    }

    svg path {
      fill: ${({ theme }) => theme.background.primary};
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
    height: auto;
    width: auto;
    display: block;

    path {
      transition: fill 0.2s ease-out;
    }
  }
`;

export default PlayButton;
