import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import TextField from 'src/shared/components/Form/TextField';
import typo from 'src/shared/styles/typo';
import Icon from 'src/shared/assets/icon/add.svg';

const WabikenForm: React.FC = () => {
  const [wabiken, setWabiken] = useState<string>('');

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setWabiken(event.target.value);
  };

  const handleButtonOnClick = (): void => {
    if (!wabiken) {
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`wabiken is ${wabiken}`);
  };

  return (
    <Container>
      <Title>購入した動画を登録</Title>
      <Grid>
        <div>
          <TextField
            label="シリアルコードを入力"
            fieldOptions={{
              type: 'text',
              name: 'wabiken',
              onChange: handleInputOnChange,
              value: wabiken,
            }}
          />
        </div>
        <div>
          <Button onClick={handleButtonOnClick} tabIndex={0}>
            <StyledIcon />
            <div>登録</div>
          </Button>
        </div>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin: 4rem auto 0;
`;

const Title = styled.div`
  ${typo.Heading3};
  line-height: 1.4;
`;

const Grid = styled.div`
  margin: 1rem 0 0;
  display: grid;
  grid-template-columns: 1fr 6rem;
  grid-gap: 0.25rem;
`;

const Button = styled.button`
  ${typo.Standard};
  display: block;
  appearance: none;
  border: none;
  width: 100%;

  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  height: 3.5rem;
  background-color: ${({ theme }) => theme.button.background.default};
  color: ${({ theme }) => theme.button.text.default};
  transition: color 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.button.background.hover};
    color: ${({ theme }) => theme.button.text.hover};

    path {
      fill: ${({ theme }) => theme.button.text.hover};
    }
  }
`;

const StyledIcon = styled(Icon)`
  &&& {
    width: 1rem;
    display: block;
    margin: 0 0.25rem 0 0;

    path {
      transition: fill 0.2s ease-out;
    }
  }
`;

export default WabikenForm;
