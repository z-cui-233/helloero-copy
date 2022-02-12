import React from 'react';
import styled from 'styled-components';

type Props = {
  src: string;
};

const TitleThumbnail: React.FC<Props> = ({ src }) => (
  <Container>
    <Image src={src} alt="" />
  </Container>
);

const Container = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color3};
  position: relative;
  aspect-ratio: 5 / 7;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default TitleThumbnail;
