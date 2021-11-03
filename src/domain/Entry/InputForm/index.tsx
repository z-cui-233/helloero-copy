import React from 'react';
import ButtonStandard from 'src/shared/components/Form/ButtonStandard';
import TextField from 'src/shared/components/Form/TextField';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';

const InputForm: React.FC = () => {
  return (
    <Container>
      <Title>購入した動画の登録</Title>
      <Text>購入時に受け取った、シリアルコードを入力してください。</Text>
      <FieldSection>
        <TextField
          label="シリアルコード"
          fieldOptions={{
            type: 'text',
            name: 'wabiken',
            onChange: () => {
              return;
            },
            value: '',
          }}
        />
      </FieldSection>
      <ButtonSection>
        <ButtonStandard
          onClick={() => {
            return;
          }}
          label={'登録する'}
        />
      </ButtonSection>
    </Container>
  );
};

const Container = styled.div``;

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

export default InputForm;
