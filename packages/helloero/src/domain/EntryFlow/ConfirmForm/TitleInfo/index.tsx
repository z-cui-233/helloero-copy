import React from 'react';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';

interface Props {
  thumbnail: string;
  titleName: string;
  displayExpireDate: string;
}

const TitleInfo: React.FC<Props> = ({
  thumbnail,
  titleName,
  displayExpireDate,
}) => {
  return (
    <Container>
      <div>
        <ThumbnailContainer>
          <Thumbnail src={thumbnail} />
        </ThumbnailContainer>
      </div>
      <MetaContainer>
        <div>
          <TitleName>{titleName}</TitleName>
          <ExpireDate>{displayExpireDate}</ExpireDate>
        </div>
      </MetaContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 2rem;
  margin: 2rem auto 0;

  @media ${device.ltTablet} {
    display: block;
    max-width: 400px;
  }
`;

const ThumbnailContainer = styled.div`
  @media ${device.ltTablet} {
    max-width: 180px;
    margin: 0 auto;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media ${device.ltTablet} {
    margin: 2rem 0 0;
  }
`;

const TitleName = styled.div`
  ${typo.Heading3};
  line-height: 1.4;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
  ${typo.Body};
`;

export default TitleInfo;
