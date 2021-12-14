import React from 'react';
import FormErrorMessage from 'src/shared/components/FormErrorMessage';
import ButtonStandard from 'src/shared/components/parts/ButtonStandard';
import MainContainer from 'src/shared/components/parts/MainContainer';
import typo from 'src/shared/styles/typo';
import {
  createExpireDateFromValidityPeriod,
  createTitleThumbnailUrl,
} from 'src/shared/utils';
import styled from 'styled-components';
import { UseEntryWabiken } from '../useEntryWabiken';
import TitleInfo from './TitleInfo';

const ConfirmForm: React.FC<UseEntryWabiken> = (props) => {
  const titleName =
    props.entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken.content
      .displayName ?? '';

  const thumbnail =
    props.entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken.content
      .thumbnails?.standard;

  const validityPeriod =
    props.entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken
      .validityPeriod;

  return (
    <MainContainer>
      <FormErrorMessage message={props.entryWabikenState.errorMessage} />
      <Title>購入した動画の登録</Title>
      <Text>内容を確認の上、登録をして下さい。</Text>
      <TitleInfo
        thumbnail={createTitleThumbnailUrl(thumbnail)}
        titleName={titleName}
        expireDate={createExpireDateFromValidityPeriod(validityPeriod)}
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
