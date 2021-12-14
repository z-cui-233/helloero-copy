import React from 'react';
import { ListUserWabikenMetasQuery } from 'src/API';
import device from 'src/shared/styles/device';
import { createTitleThumbnailUrl } from 'src/shared/utils';
import styled from 'styled-components';
import TitleCard from './TitleCard';
import TitleDetail from './TitleDetail';
import useTitleDetail from './useTitleList';

interface Props {
  listData: ListUserWabikenMetasQuery | undefined;
}

const TitleList: React.FC<Props> = ({ listData }) => {
  const store = useTitleDetail();

  return (
    <React.Fragment>
      <Container>
        <List>
          {listData?.listUserWabikenMetas?.items.map((data) => (
            <div key={data.id}>
              <TitleCard
                thumbnailUrl={createTitleThumbnailUrl(
                  data.content.thumbnails.standard
                )}
                wabiken={data.id}
                goToPlay={store.goToPlay}
                openTitleDetail={store.openTitleDetail}
              />
            </div>
          ))}
        </List>
      </Container>
      <TitleDetail {...store} />
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

export default TitleList;
