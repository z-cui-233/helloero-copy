import Link from 'next/link';
import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import PlayButton from './PlayButton';

const ContentsCard: React.FC = () => {
  return (
    <Container>
      <Image
        src="https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg?output-format=jpg&output-quality=60&resize=300:*&letterbox=5:7&bgblur=50,0.5"
        alt=""
      />
      <Control>
        <Link href="/play" passHref>
          <a>
            <PlayButton />
          </a>
        </Link>
        <DetailButton>
          <div>詳細を見る</div>
        </DetailButton>
      </Control>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.background.tertiary};
  box-shadow: 0px 4px 24px 0px ${({ theme }) => theme.filter.secondary};
  aspect-ratio: 5 / 7;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Control = styled.div`
  transition: opacity 0.3s ease-out;
  background-color: ${({ theme }) => theme.filter.standard};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`;

const DetailButton = styled.div`
  ${typo.Standard};
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.button.background.default};
  color: ${({ theme }) => theme.button.text.default};
  transition: color 0.2s ease-out;

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.button.text.hover};
  }
`;

export default ContentsCard;
