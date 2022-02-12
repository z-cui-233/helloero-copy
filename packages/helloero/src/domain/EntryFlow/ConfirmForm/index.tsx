import React from 'react';
import styled from 'styled-components';
import { UseEntryWabiken } from '../useEntryWabiken';
import TitleInfo from './TitleInfo';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import ButtonStandard from '@/shared/components/ButtonStandard';
import MainContainer from '@/shared/components/MainContainer';
import { createExpireDate, createTitleThumbnailUrl } from '@/shared/utils';
import PageTitle from '@/shared/components/PageTitle';

type Props = {
  entryWabikenState: UseEntryWabiken['entryWabikenState'];
  consumeWabiken: UseEntryWabiken['consumeWabiken'];
};

const ConfirmForm: React.FC<Props> = ({
  entryWabikenState,
  consumeWabiken,
}) => {
  const titleName =
    entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken.content
      .displayName ?? '';

  const thumbnail =
    entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken.content
      .thumbnails?.standard;

  const validityPeriod =
    entryWabikenState.getWabikenMetaQuery?.getWabikenMeta?.wabiken
      .validityPeriod;

  return (
    <MainContainer>
      <FormErrorMessage message={entryWabikenState.errorMessage} />
      <PageTitle text="シリアルコードの登録" />
      <Section>
        <div>内容を確認の上、登録をして下さい。</div>
        <TitleInfo
          thumbnail={createTitleThumbnailUrl(thumbnail)}
          titleName={titleName}
          displayExpireDate={createExpireDate(validityPeriod)}
        />
      </Section>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            consumeWabiken();
          }}
          label="動画を登録"
        />
      </ButtonSection>
    </MainContainer>
  );
};

const Section = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default ConfirmForm;
