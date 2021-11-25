import { useRouter } from 'next/router';
import React from 'react';
import ButtonStandard, {
  BUTTON_ICONS,
} from 'src/shared/components/parts/ButtonStandard';
import device from 'src/shared/styles/device';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const MetaInfo: React.FC = () => {
  const router = useRouter();

  const handleOnClick = (): void => {
    router.push('/play');
  };

  return (
    <Container>
      <TitleName>
        ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。
      </TitleName>
      <ExpireDate>
        2021年12月31日 23:59まで視聴可能 2021年12月31日 23:59まで視聴可能
      </ExpireDate>
      <Casts>
        ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。
      </Casts>
      <Button>
        <ButtonStandard
          iconType={BUTTON_ICONS.PLAY}
          onClick={() => {
            handleOnClick();
          }}
          label={'この動画を再生'}
        />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 2rem;
  width: 100%;

  @media ${device.ltTablet} {
    padding: 2rem;
  }
`;

const TitleName = styled.div`
  ${typo.Heading3};
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
`;

const Casts = styled.div`
  margin: 1rem 0 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Button = styled.div`
  margin: 3rem 0 0;
`;

export default MetaInfo;
