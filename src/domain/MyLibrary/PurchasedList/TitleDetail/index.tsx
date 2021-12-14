import { useRouter } from 'next/router';
import React from 'react';
import { UserWabikenMeta } from 'src/API';
import PortalModal from 'src/shared/components/PortalModal';
import device from 'src/shared/styles/device';
import {
  createExpireDateFromValidityPeriod,
  createTitleThumbnailUrl,
} from 'src/shared/utils';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import MetaInfo from './MetaInfo';
import Thumbnail from './Thumbnail';

interface Props {
  userWabikenMeta: UserWabikenMeta;
  isShownDetail: boolean;
  onClickClose: UsePurchasedList['closeTitleDetail'];
}

const TitleDetail: React.FC<Props> = ({
  userWabikenMeta,
  isShownDetail,
  onClickClose,
}) => {
  const router = useRouter();

  return isShownDetail ? (
    <PortalModal onClickClose={onClickClose}>
      <Container>
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
              expireDate={createExpireDateFromValidityPeriod(
                userWabikenMeta.validityPeriod,
                new Date(userWabikenMeta.updatedAt)
              )}
              onClick={() => {
                router.push(`/play?wabiken=${userWabikenMeta.id}`);
              }}
            />
          </MetaContainer>
        </div>
      </Container>
    </PortalModal>
  ) : null;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 0;

  @media ${device.ltTablet} {
    display: block;
    max-width: 400px;
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
