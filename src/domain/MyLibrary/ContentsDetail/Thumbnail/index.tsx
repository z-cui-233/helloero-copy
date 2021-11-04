import React from 'react';
import device from 'src/shared/styles/device';
import styled from 'styled-components';

const Thumbnail: React.FC = () => {
  return (
    <Container>
      <Content>
        <Image
          src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg?output-format=jpg&output-quality=60&resize=300:*&letterbox=5:7&bgblur=50,0.5"
          alt=""
        />
      </Content>
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
    max-width: 200px;
    margin: 0 auto;
    padding: 3rem 1rem 0;
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  position: relative;
  aspect-ratio: 5 / 7;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Thumbnail;
