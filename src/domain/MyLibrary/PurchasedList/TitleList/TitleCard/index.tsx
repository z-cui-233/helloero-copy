import React from 'react';
import TitleThumbnail from 'src/shared/components/parts/TitleThumbnail';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import { UseTitleList } from '../useTitleList';
import DetailButton from './DetailButton';
import PlayButton from './PlayButton';

interface Props {
  wabiken: string;
  goToPlay: UseTitleList['goToPlay'];
  openTitleDetail: UseTitleList['openTitleDetail'];
}

const TitleCard: React.FC<Props> = ({ wabiken, goToPlay, openTitleDetail }) => {
  const handleClickOpenDetail = (): void => {
    openTitleDetail(wabiken);
  };

  const handleClickPlay = (): void => {
    goToPlay(wabiken);
  };

  return (
    <Container>
      <TitleThumbnail src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg" />
      <HoverControl>
        <PlayButton onClick={handleClickPlay} />
        <DetailButton onClick={handleClickOpenDetail} />
      </HoverControl>
      <TapControl onClick={handleClickOpenDetail} />
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 4px 24px 0px ${({ theme }) => theme.background.quaternary};
  position: relative;
`;

const HoverControl = styled.div`
  transition: opacity 0.3s ease-out;
  background-color: ${({ theme }) => theme.foreground.secondary};
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
