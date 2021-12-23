import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import device from '@/shared/styles/device';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import TitleCard from './TitleCard';

interface Props {
  purchasedListState: UsePurchasedList['purchasedListState'];
  openTitleDetail: UsePurchasedList['openTitleDetail'];
  fetchListData: UsePurchasedList['fetchListData'];
}

const TitleList: React.FC<Props> = ({
  purchasedListState,
  openTitleDetail,
  fetchListData,
}) => {
  return (
    <React.Fragment>
      <Container>
        {!purchasedListState.isInitialized ? (
          <List>
            {[...Array(8)].map((_, i) => (
              <div key={i}>
                <DummyCard />
              </div>
            ))}
          </List>
        ) : (
          <InfiniteScroll
            dataLength={purchasedListState.userWabikenMetas?.length ?? 0}
            next={() => {
              fetchListData(purchasedListState.nextToken);
            }}
            hasMore={!!purchasedListState.nextToken}
            loader={<div>loading</div>}
          >
            <List>
              {purchasedListState.userWabikenMetas?.map((userWabikenMeta) => (
                <div key={userWabikenMeta.id}>
                  <TitleCard
                    userWabikenMeta={userWabikenMeta}
                    openTitleDetail={openTitleDetail}
                  />
                </div>
              ))}
            </List>
          </InfiniteScroll>
        )}
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
  min-height: 35rem;
`;

const DummyCard = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color3};
  aspect-ratio: 5 / 7;
  width: 100%;
`;

export default TitleList;
