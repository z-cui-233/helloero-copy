import React from 'react';
import PortalModal from 'src/shared/components/PortalModal';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import { UseTitleList } from '../useTitleList';
import MetaInfo from './MetaInfo';
import Thumbnail from './Thumbnail';

const TitleDetail: React.FC<UseTitleList> = ({
  state,
  goToPlay,
  closeTitleDetail,
}) => {
  return state.isShownDetail ? (
    <PortalModal onClickClose={closeTitleDetail}>
      <Container>
        <div>
          <ThumbnailContainer>
            <Thumbnail />
          </ThumbnailContainer>
        </div>
        <div>
          <MetaContainer>
            <MetaInfo
              onClick={() => {
                goToPlay(state.wabiken);
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
