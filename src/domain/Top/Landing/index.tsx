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
            <Image src="/images/dummy/600x600.png" alt="hello ero" />
          </Artwork>
        </div>
        <div>
          <Title>
            この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。
          </Title>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

const Container = styled.div`
  max-width: 1024px;
  margin: 4rem auto 0;
  width: calc(100% - 4rem);

  @media ${device.ltTablet} {
    width: calc(100% - 2rem);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;

  @media ${device.ltTablet} {
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

const Title = styled.div`
  ${typo.Heading1};
`;

const Text = styled.div`
  margin: 1.5rem 0 0;
`;

const ButtonContainer = styled.div`
  margin: 3rem 0 0;
`;

export default Landing;
