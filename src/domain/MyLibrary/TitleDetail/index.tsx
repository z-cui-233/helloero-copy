import React from 'react';
import PortalModal from 'src/shared/components/PortalModal';
import {
  ACTION_TYPE,
  FLOW_STATUS,
  useTitleDetailCardContext,
} from 'src/shared/context/TitleDetailCardContext';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import MetaInfo from './MetaInfo';
import Thumbnail from './Thumbnail';

const TitleDetail: React.FC = () => {
  const { state, dispatch } = useTitleDetailCardContext();

  const handleOnClickClose = (): void => {
    dispatch({
      type: ACTION_TYPE.CLOSE,
      payload: {
        ...state,
        wabiken: '',
      },
    });
  };

  return state.flowStatus === FLOW_STATUS.SHRINK ? null : (
    <PortalModal onClickClose={handleOnClickClose}>
      <Container>
        <div>
          <ThumbnailContainer>
            <Thumbnail />
          </ThumbnailContainer>
        </div>
        <div>
          <MetaContainer>
            <MetaInfo />
          </MetaContainer>
        </div>
      </Container>
    </PortalModal>
  );
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
