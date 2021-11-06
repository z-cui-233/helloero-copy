import React from 'react';
import TitleThumbnail from 'src/shared/components/atomic/parts/TitleThumbnail';
import {
  ACTION_TYPE,
  useTitleDetailCardContext,
} from 'src/shared/context/TitleDetailCardContext';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import DetailButton from './DetailButton';
import PlayButton from './PlayButton';

const TitleCard: React.FC = () => {
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
      <TitleThumbnail src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg" />
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
  box-shadow: 0px 4px 24px 0px ${({ theme }) => theme.filter.secondary};
  position: relative;
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

export default TitleCard;
