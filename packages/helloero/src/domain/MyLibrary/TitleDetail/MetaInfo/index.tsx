import React from 'react';
import styled from 'styled-components';
import ButtonStandard, {
  BUTTON_ICONS,
} from '@/shared/components/ButtonStandard';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';

type Props = {
  titleName: string;
  displayExpireDate: string;
  onClick: () => void;
};

const MetaInfo: React.FC<Props> = ({
  titleName,
  displayExpireDate,
  onClick,
}) => (
  <Container>
    <TitleName>{titleName}</TitleName>
    <ExpireDate>{displayExpireDate}</ExpireDate>
    <Button>
      <ButtonStandard
        iconType={BUTTON_ICONS.PLAY}
        onClick={onClick}
        label="この動画を再生"
      />
    </Button>
  </Container>
);

const Container = styled.div`
  padding: 3rem 2rem;
  width: 100%;

  @media ${device.ltTablet} {
    padding: 2rem 1rem;
  }
`;

const TitleName = styled.div`
  ${typo.Heading3};
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const ExpireDate = styled.div`
  margin: 1rem 0 0;
  ${typo.Body};
`;

const Button = styled.div`
  margin: 3rem 0 0;
`;

export default MetaInfo;
