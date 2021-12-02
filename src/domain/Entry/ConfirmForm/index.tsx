import React from 'react';
import ButtonStandard from 'src/shared/components/parts/ButtonStandard';
import MainContainer from 'src/shared/components/parts/MainContainer';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import { UseEntryWabiken } from '../useEntryWabiken';
import TitleInfo from './TitleInfo';

const ConfirmForm: React.FC<UseEntryWabiken> = (props) => {
  const now = new Date();
  return (
    <MainContainer>
      <Title>購入した動画の登録</Title>
      <Text>内容を確認の上、登録をして下さい。</Text>
      <TitleInfo
        thumbnail={
          'https://metac.nxtv.jp/img/bookimg/pubridge/00002017/BT000020170201501501.jpg'
        }
        titleName={
          'ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。ここはタイトルです。'
        }
        expireDate={now}
        castName={
          'ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。ここは女優名です。'
        }
      />
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            props.consumeWabiken();
          }}
          label={'動画を登録'}
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default ConfirmForm;
