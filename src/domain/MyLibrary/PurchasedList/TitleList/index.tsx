import React from 'react';
import { UserWabikenMeta } from 'src/API';
import device from 'src/shared/styles/device';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import TitleCard from './TitleCard';

interface Props {
  isInitialized: boolean;
  listData: UserWabikenMeta[] | undefined;
  openTitleDetail: UsePurchasedList['openTitleDetail'];
}

const TitleList: React.FC<Props> = ({
  isInitialized,
  listData,
  openTitleDetail,
}) => {
  return (
    <React.Fragment>
      <Container>
        <List>
          {!isInitialized &&
            [...Array(8)].map((_, i) => (
              <div key={i}>
                <DummyCard />
              </div>
            ))}
          {isInitialized &&
            listData?.map((userWabikenMeta) => (
              <div key={userWabikenMeta.id}>
                <TitleCard
                  userWabikenMeta={userWabikenMeta}
                  openTitleDetail={openTitleDetail}
                />
              </div>
            ))}
        </List>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  margin: 1.5rem 0 0;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem 0.5rem;

  @media ${device.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DummyCard = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  aspect-ratio: 5 / 7;
  width: 100%;
`;

export default TitleList;
