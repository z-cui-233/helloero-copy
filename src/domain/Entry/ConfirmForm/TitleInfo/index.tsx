import React from 'react';
import TitleThumbnail from 'src/shared/components/parts/TitleThumbnail';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  thumbnail: string;
  titleName: string;
  expireDate: Date;
  castName: string;
}

const TitleInfo: React.FC<Props> = ({
  thumbnail,
  titleName,
  expireDate,
  castName,
}) => {
  return (
    <Container>
      <ThumbnailContainer>
        <TitleThumbnail src={thumbnail} />
      </ThumbnailContainer>
      <MetaContainer>
        <TitleName>{titleName}</TitleName>
        {expireDate && (
          <ExpireDate>
            {expireDate.toISOString()}
            まで視聴可能
          </ExpireDate>
        )}
        <Casts>{castName}</Casts>
      </MetaContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 0 0;
  background-color: ${({ theme }) => theme.keyColor.color3};
  padding: 2rem 1rem;
`;

const ThumbnailContainer = styled.div`
  margin: 0 auto;
  max-width: 200px;
`;

const MetaContainer = styled.div`
  margin: 2rem 0 0;
`;

const TitleName = styled.div`
  ${typo.Heading3};
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
`;

const Casts = styled.div`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.foreground.secondary};
`;

export default TitleInfo;
