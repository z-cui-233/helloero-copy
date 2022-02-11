import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';

const Landing: React.FC = () => {
  const router = useRouter();

  const handleClickSingIn = (): void => {
    const backUrl = encodeURIComponent(globalConfig.HELLOERO);
    router.push(`${globalConfig.ACCOUNT}/login?back=${backUrl}`);
  };

  return (
    <Container>
      <Grid>
        <div>
          <Artwork>
            <ImageBox>
              <img
                src={`/images/top/cover${Math.floor(Math.random() * 3)}.jpg`}
                alt="HELLOERO(ハローエロ)"
              />
            </ImageBox>
          </Artwork>
        </div>
        <LeadTexts>
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
                  handleClickSingIn();
                }}
                label="ログイン/アカウント登録"
              />
            </ButtonContainer>
          </div>
        </LeadTexts>
      </Grid>
    </Container>
  );
};

const Container = styled.section`
  max-width: 60rem;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);

  @media ${device.ltSd} {
    max-width: 30rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2.5rem;

  @media ${device.ltSd} {
    grid-template-columns: 1fr;
  }
`;

const Artwork = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;

  &:before {
    position: absolute;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    right: 0;
    bottom: 0;
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.keyColor.color3};
  }

  @media ${device.ltSd} {
    max-width: 25rem;
    margin: 0 auto;
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  object-fit: contain;
  background-color: ${({ theme }) => theme.keyColor.color3};

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const LeadTexts = styled.div`
  display: flex;
  align-items: center;
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
