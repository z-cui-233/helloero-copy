import React from 'react';
import ButtonStandard, {
  BUTTON_ICONS,
} from 'src/shared/components/parts/ButtonStandard';
import device from 'src/shared/styles/device';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

interface Props {
  titleName: string;
  expireDate: string;
  onClick: () => void;
}

const MetaInfo: React.FC<Props> = ({ titleName, expireDate, onClick }) => (
  <Container>
    <TitleName>{titleName}</TitleName>
    {expireDate && <ExpireDate>{expireDate}まで視聴可能</ExpireDate>}
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
  max-height: 6.3rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
`;

const Button = styled.div`
  margin: 3rem 0 0;
`;

export default MetaInfo;
