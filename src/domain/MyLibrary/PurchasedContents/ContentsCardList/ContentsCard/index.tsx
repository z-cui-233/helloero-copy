import React from 'react';
import {
  ACTION_TYPE,
  useTitleDetailCardContext,
} from 'src/shared/context/TitleDetailCardContext';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import DetailButton from './DetailButton';
import PlayButton from './PlayButton';

const ContentsCard: React.FC = () => {
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
    <Container>
      <Image
        src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg?output-format=jpg&output-quality=60&resize=300:*&letterbox=5:7&bgblur=50,0.5"
        alt=""
      />
      <HoverControl>
        <PlayButton />
        <DetailButton />
      </HoverControl>
      <TapControl
        onClick={() => {
          handleOnClick();
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  box-shadow: 0px 4px 24px 0px ${({ theme }) => theme.filter.secondary};
  aspect-ratio: 5 / 7;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverControl = styled.div`
  transition: opacity 0.3s ease-out;
  background-color: ${({ theme }) => theme.filter.standard};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  display: block;

  &:hover {
    opacity: 1;
  }

  @media ${device.mobile} {
    display: none;
  }
`;

const TapControl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  display: none;

  @media ${device.mobile} {
    display: block;
  }
`;

export default ContentsCard;
