import styled from 'styled-components';
import React from 'react';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import ButtonStandard from '@/shared/components/ButtonStandard';
import { UsePretestPlayback } from '../usePretestPlayback';

type Props = {
  playbackStart: UsePretestPlayback['playbackStart'];
};

const Confirmation: React.FC<Props> = ({ playbackStart }) => (
  <LayoutHelloero options={globalConfig}>
    <MainContainer>
      <PageTitle text="視聴環境の動作確認" />
      <Section>
        <Text>
          テスト動画を再生して、お客様の視聴環境を確認してください。
          <br />
          <a
            href={`${globalConfig.HELP}/guide/browse/category5`}
            target="_blank"
            rel="noopener noreferrer"
          >
            対応デバイス
          </a>
        </Text>
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            playbackStart();
          }}
          label="テスト動画を再生"
        />
      </ButtonSection>
    </MainContainer>
  </LayoutHelloero>
);

const Section = styled.div`
  margin: 2rem 0 0;
`;

const Text = styled.div`
  a {
    text-decoration: underline;
    font-size: inherit;
  }
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default Confirmation;
