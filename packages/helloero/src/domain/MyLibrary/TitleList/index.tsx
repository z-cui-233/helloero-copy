import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';
import { UsePurchasedList } from '../usePurchasedList';
import SkeltonCard from './SkeltonCard';
import TitleCard from './TitleCard';

type Props = {
  purchasedListState: UsePurchasedList['purchasedListState'];
  openTitleDetail: UsePurchasedList['openTitleDetail'];
  fetchUserWabikenMetas: UsePurchasedList['fetchUserWabikenMetas'];
};

const TitleList: React.FC<Props> = ({
  purchasedListState,
  openTitleDetail,
  fetchUserWabikenMetas,
}) => (
  <React.Fragment>
    <Container>
      {!purchasedListState.isInitialized ? (
        <List>
          {[...Array(12)].map((_, i) => (
            <SkeltonCard key={i} />
          ))}
        </List>
      ) : (
        <React.Fragment>
          {purchasedListState.userWabikenMetas?.length > 0 ? (
            <InfiniteScroll
              dataLength={purchasedListState.userWabikenMetas?.length ?? 0}
              next={() => {
                fetchUserWabikenMetas({
                  query: purchasedListState.query,
                  displayOrder: purchasedListState.displayOrder,
                });
              }}
              hasMore={
                purchasedListState.total >
                purchasedListState.userWabikenMetas.length
              }
              loader={<Loading>...</Loading>}
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
          ) : (
            <NoData>該当する作品がありません。</NoData>
          )}
        </React.Fragment>
      )}
    </Container>
  </React.Fragment>
);

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
