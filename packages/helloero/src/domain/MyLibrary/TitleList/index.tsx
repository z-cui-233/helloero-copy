import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { UsePurchasedList } from '../usePurchasedList';
import TitleCard from './TitleCard';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';

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
            {[...Array(7)].map((_, i) => (
              <div key={i}>
                <DummyCard />
              </div>
            ))}
          </List>
        ) : (
          <React.Fragment>
            {purchasedListState.userWabikenMetas?.length > 0 ? (
              <InfiniteScroll
                dataLength={purchasedListState.userWabikenMetas?.length ?? 0}
                next={() => {
                  fetchListData(purchasedListState.nextToken);
                }}
                hasMore={!!purchasedListState.nextToken}
                loader={<Loading>...</Loading>}
              >
                <List>
                  {purchasedListState.userWabikenMetas?.map(
                    (userWabikenMeta) => (
                      <div key={userWabikenMeta.id}>
                        <TitleCard
                          userWabikenMeta={userWabikenMeta}
                          openTitleDetail={openTitleDetail}
                        />
                      </div>
                    )
                  )}
                </List>
              </InfiniteScroll>
            ) : (
              <NoData>該当する作品がありません。</NoData>
            )}
          </React.Fragment>
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
`;

const DummyCard = styled.div`
  background-color: ${({ theme }) => theme.keyColor.color3};
  aspect-ratio: 5 / 7;
  width: 100%;
`;

const Loading = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.tertiary};
  margin: 2rem 0 0;
  text-align: center;
`;

const NoData = styled.div`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.tertiary};
  margin: 4rem 0;
`;

export default TitleList;
