import React from 'react';
import {
  ACTION_TYPE,
  useTitleDetailCardContext,
} from 'src/shared/context/TitleDetailCardContext';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const DetailButton: React.FC = () => {
  const { state, dispatch } = useTitleDetailCardContext();

  const handleOnClick = (): void => {
    dispatch({
      type: ACTION_TYPE.REQUEST_OPEN,
      payload: {
        ...state,
        wabiken: '123',
      },
    });
  };

  return (
    <Container
      onClick={() => {
        handleOnClick();
      }}
    >
      <div>詳細を見る</div>
    </Container>
  );
};

const Container = styled.div`
  ${typo.Standard};
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.keyColor.color1};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  transition: color 0.2s ease-out;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};
  }
`;

export default DetailButton;
