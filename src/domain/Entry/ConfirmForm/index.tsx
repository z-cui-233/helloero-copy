import React from 'react';
import ButtonStandard from 'src/shared/components/parts/ButtonStandard';
import MainContainer from 'src/shared/components/parts/MainContainer';
import {
  ACTION_TYPE,
  useWabikenEntryContext,
} from 'src/shared/context/WabikenEntryContext';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import TitleInfo from './TitleInfo';

const ConfirmForm: React.FC = () => {
  const { state, dispatch } = useWabikenEntryContext();

  const handleOnClick = (): void => {
    dispatch({
      type: ACTION_TYPE.CONFIRMED,
      payload: {
        ...state,
      },
    });
  };

  return (
    <MainContainer>
      <Title>購入した動画の登録</Title>
      <Text>内容を確認の上、登録をして下さい。</Text>
      <TitleInfo />
      <ButtonSection>
        <ButtonStandard onClick={() => handleOnClick()} label={'動画を登録'} />
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
