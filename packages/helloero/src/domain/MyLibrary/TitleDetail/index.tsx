import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { UserWabikenMeta } from '../../../API';
import { UsePurchasedList } from '../usePurchasedList';
import MetaInfo from './MetaInfo';
import Thumbnail from './Thumbnail';
import device from '@/shared/styles/device';
import { createExpireDate, createTitleThumbnailUrl } from '@/shared/utils';
import Portal from '@/shared/components/Portal';

type Props = {
  userWabikenMeta: UserWabikenMeta | null;
  isShownDetail: boolean;
  onClickClose: UsePurchasedList['closeTitleDetail'];
};

const TitleDetail: React.FC<Props> = ({
  userWabikenMeta,
  isShownDetail,
  onClickClose,
}) => {
  const router = useRouter();

  return isShownDetail && userWabikenMeta ? (
    <Portal>
      <Container>
        <Grid>
          <div>
            <ThumbnailContainer>
              <Thumbnail
                src={createTitleThumbnailUrl(
                  userWabikenMeta.content.thumbnails.standard
                )}
              />
            </ThumbnailContainer>
          </div>
          <div>
            <MetaContainer>
              <MetaInfo
                titleName={userWabikenMeta.content.displayName}
                displayExpireDate={createExpireDate(
                  userWabikenMeta.validityPeriod,
                  userWabikenMeta.notValidAfter
                )}
                onClick={() => {
                  router.push(`/play/${userWabikenMeta.id}`);
                }}
              />
            </MetaContainer>
          </div>
        </Grid>
        <CloseButton onClick={onClickClose} />
      </Container>
    </Portal>
  ) : null;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.primary};
  max-width: 800px;
  position: relative;
  overflow: hidden;
  width: calc(100% - 1rem);
  margin: auto;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5rem;
  height: 2.5rem;
  content: '';
  display: block;
  background-color: ${({ theme }) => theme.background.primaryInverted};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.keyColor.color1};
  }

  &:before {
    height: 2px;
    width: 1.5rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.background.primary};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(45deg);
  }

  &:after {
    height: 2px;
    width: 1.5rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.background.primary};

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    transform: rotate(-45deg);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 0;

  @media ${device.ltTablet} {
    display: block;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const ThumbnailContainer = styled.div`
  padding: 1.5rem 0 1.5rem 1.5rem;

  @media ${device.ltTablet} {
    padding: 3rem 1.5rem 0;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default TitleDetail;
