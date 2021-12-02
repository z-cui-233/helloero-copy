import React from 'react';
import TitleThumbnail from 'src/shared/components/parts/TitleThumbnail';
import device from 'src/shared/styles/device';
import styled from 'styled-components';

const Thumbnail: React.FC = () => {
  return (
    <Container>
      <ImageAdjust>
        <TitleThumbnail src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg" />
      </ImageAdjust>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  padding: 0 1rem 1rem 0;

  &:before {
    position: absolute;
    aspect-ratio: 5 / 7;
    top: 1rem;
    left: 1rem;
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.keyColor.color3};
  }

  @media ${device.ltTablet} {
    max-width: 180px;
    margin: 0 auto;
  }
`;

const ImageAdjust = styled.div`
  position: relative;
  aspect-ratio: 5 / 7;
`;

export default Thumbnail;
