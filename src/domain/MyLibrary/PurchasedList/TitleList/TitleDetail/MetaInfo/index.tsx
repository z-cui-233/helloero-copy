import React from 'react';
import ButtonStandard, {
  BUTTON_ICONS,
} from 'src/shared/components/parts/ButtonStandard';
import device from 'src/shared/styles/device';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const MetaInfo: React.FC<Props> = ({ onClick }) => (
  <Container>
    <TitleName>
      ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。
    </TitleName>
    <ExpireDate>
      2021年12月31日 23:59まで視聴可能 2021年12月31日 23:59まで視聴可能
    </ExpireDate>
    <Button>
      <ButtonStandard
        iconType={BUTTON_ICONS.PLAY}
        onClick={onClick}
        label={'この動画を再生'}
      />
    </Button>
  </Container>
);

const Container = styled.div`
  padding: 3rem 2rem;
  width: 100%;

  @media ${device.ltTablet} {
    padding: 2rem;
  }
`;

const TitleName = styled.div`
  ${typo.Heading3};
  line-height: 1.4;
  height: 6.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
`;

const Button = styled.div`
  margin: 3rem 0 0;
`;

export default MetaInfo;