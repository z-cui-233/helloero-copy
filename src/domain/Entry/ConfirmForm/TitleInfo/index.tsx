import React from 'react';
import TitleThumbnail from 'src/shared/components/atomic/parts/TitleThumbnail';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const TitleInfo: React.FC = () => {
  return (
    <Container>
      <ThumbnailContainer>
        <TitleThumbnail src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg" />
      </ThumbnailContainer>
      <MetaContainer>
        <TitleName>
          ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。
        </TitleName>
        <ExpireDate>
          2021年12月31日 23:59まで視聴可能 2021年12月31日 23:59まで視聴可能
        </ExpireDate>
        <Casts>
          ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。
        </Casts>
      </MetaContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 0 0;
  background-color: ${({ theme }) => theme.background.tertiary};
  padding: 2rem;
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
  line-height: 1.4em;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
`;

const Casts = styled.div`
  margin: 1rem 0 0;
`;

export default TitleInfo;
