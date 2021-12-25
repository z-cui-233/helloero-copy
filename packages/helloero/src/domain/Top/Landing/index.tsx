import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import device from '@/shared/styles/device';
import typo from '@/shared/styles/typo';
import { useLocale } from '@/shared/context/LocaleContext';

const Landing: React.FC = () => {
  const router = useRouter();
  const { locale, lang } = useLocale();

  const handleClickSingIn = (): void => {
    const backUrl = encodeURIComponent(`${globalConfig.HELLOERO}/${locale}`);
    router.push(`${globalConfig.ACCOUNT}/${locale}/login?back=${backUrl}`);
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
            <Title>{lang.helloero.top.lead}</Title>
            <Text>{lang.helloero.top.description}</Text>
            <ButtonContainer>
              <ButtonStandard
                onClick={() => {
                  handleClickSingIn();
                }}
                label={lang.helloero.top.button}
              />
            </ButtonContainer>
          </div>
        </LeadTexts>
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
  grid-gap: 4rem;

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
