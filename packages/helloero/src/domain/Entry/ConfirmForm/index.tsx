import React from 'react';
import FormErrorMessage from '@/shared/components/FormErrorMessage';
import ButtonStandard from '@/shared/components/parts/ButtonStandard';
import MainContainer from '@/shared/components/parts/MainContainer';
import typo from '@/shared/styles/typo';
import { createExpireDate, createTitleThumbnailUrl } from '@/shared/utils';
import styled from 'styled-components';
import { UseEntryWabiken } from '../useEntryWabiken';
import TitleInfo from './TitleInfo';
import { useLocale } from '@/shared/context/LocaleContext';

const ConfirmForm: React.FC<UseEntryWabiken> = (props) => {
  const { locale, lang } = useLocale();

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
      <Title>{lang.helloero.entry.confirm.title}</Title>
      <Text>{lang.helloero.entry.confirm.text}</Text>
      <TitleInfo
        thumbnail={createTitleThumbnailUrl(thumbnail)}
        titleName={titleName}
        displayExpireDate={createExpireDate(locale, validityPeriod)}
      />
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            props.consumeWabiken();
          }}
          label={lang.helloero.entry.confirm.button}
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
