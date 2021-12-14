import React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
}

const TitleThumbnail: React.FC<Props> = ({ src }) => {
  return (
    <Container>
      <Image
        src={`${src}?output-format=jpg&output-quality=60&resize=300:*&letterbox=5:7&bgblur=50,0.5`}
        alt=""
      />
    </Container>
  );
};

const Container = styled.div`
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

export default TitleThumbnail;
