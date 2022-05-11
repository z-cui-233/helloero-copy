import React from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import LayoutHelloero from '@/shared/components/LayoutHelloero';
import MainContainer from '@/shared/components/MainContainer';
import PageTitle from '@/shared/components/PageTitle';
import Playback from './Playback';
import usePretestPlayback from './usePretestPlayback';

const PretestPlayback: React.FC = () => {
  const { playerState } = usePretestPlayback();

  return (
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
        <Section>
          <Playback playerState={playerState} />
        </Section>
      </MainContainer>
    </LayoutHelloero>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
`;

const Text = styled.div`
  a {
    text-decoration: underline;
    font-size: inherit;
  }
`;

export default PretestPlayback;
