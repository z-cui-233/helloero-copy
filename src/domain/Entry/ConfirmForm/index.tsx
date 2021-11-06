import React from 'react';
import ButtonStandard from 'src/shared/components/Form/ButtonStandard';
import {
  ACTION_TYPE,
  useWabikenEntryContext,
} from 'src/shared/context/WabikenEntryContext';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

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
    <React.Fragment>
      <Title>購入した動画の登録</Title>
      <Text>内容を確認してください。</Text>
      <FieldSection></FieldSection>
      <ButtonSection>
        <ButtonStandard onClick={() => handleOnClick()} label={'登録する'} />
      </ButtonSection>
    </React.Fragment>
  );
};

const Title = styled.div`
  ${typo.Heading2};
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default ConfirmForm;
