import React from 'react';
import TitleThumbnail from 'src/shared/components/atomic/parts/TitleThumbnail';
import device from 'src/shared/styles/device';
import styled from 'styled-components';

const Thumbnail: React.FC = () => {
  return (
    <Container>
      <TitleThumbnail src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg" />
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.ltTablet} {
    max-width: 160px;
    margin: 0 auto;
    padding: 3rem 1rem 0;
  }
`;

export default Thumbnail;
