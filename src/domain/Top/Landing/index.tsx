import { useRouter } from 'next/router';
import React from 'react';
import ButtonStandard from 'src/shared/components/parts/ButtonStandard';
import device from 'src/shared/styles/device';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const Landing: React.FC = () => {
  const router = useRouter();

  const handleClickLogin = (): void => {
    router.push('/login');
  };

  return (
    <Container>
      <Grid>
        <div>
          <Artwork>
            <Image src="/images/dummy/600x600.png" alt="HELLOERO(ハローエロ)" />
          </Artwork>
        </div>
        <div>
          <Title>
            シンプルに、カジュアルに。アダルトコンテンツを楽しもう。
          </Title>
          <Text>
            ようこそ、HELLOERO(ハローエロ)へ。さあ、今すぐログインして、購入済みのコードを使って視聴をスタートしましょう。はじめてご利用の方はアカウント登録からお願いします。
          </Text>
          <ButtonContainer>
            <ButtonStandard
              onClick={() => {
                handleClickLogin();
              }}
              label={'ログイン/アカウント登録'}
            />
          </ButtonContainer>
        </div>
      </Grid>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1024px;
  margin: 4rem auto 0;
  width: calc(100% - 4rem);

  @media ${device.ltSd} {
    max-width: 640px;
    width: calc(100% - 2rem);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;

  @media ${device.ltSd} {
    grid-template-columns: 1fr;
    grid-gap: 6rem;
  }
`;

const Artwork = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  width: calc(100% - 2rem);

  &:before {
    position: absolute;
    top: 2rem;
    left: 2rem;
    right: -2rem;
    bottom: -2rem;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.background.tertiary};
  }
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Title = styled.h2`
  ${typo.Heading1};
`;

const Text = styled.p`
  margin: 1.5rem 0 0;
`;

const ButtonContainer = styled.div`
  margin: 3rem 0 0;
`;

export default Landing;
