import { useRouter } from 'next/router';
import React from 'react';
import { UserWabikenMeta } from '../../../../../API';
import TitleThumbnail from '@/shared/components/parts/TitleThumbnail';
import device from '@/shared/styles/device';
import { createTitleThumbnailUrl } from '@/shared/utils';
import styled from 'styled-components';
import { UsePurchasedList } from '../../usePurchasedList';
import DetailButton from './DetailButton';
import PlayButton from './PlayButton';

interface Props {
  userWabikenMeta: UserWabikenMeta;
  openTitleDetail: UsePurchasedList['openTitleDetail'];
}

const TitleCard: React.FC<Props> = ({ openTitleDetail, userWabikenMeta }) => {
  const router = useRouter();

  const handleClickOpenDetail = (): void => {
    openTitleDetail(userWabikenMeta);
  };

  return (
    <Container>
      <TitleThumbnail
        src={createTitleThumbnailUrl(
          userWabikenMeta.content.thumbnails.standard
        )}
      />
      <HoverControl>
        <PlayButton
          onClick={() => {
            router.push(`/play/${userWabikenMeta.id}`);
          }}
        />
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

export default React.memo(TitleCard);
