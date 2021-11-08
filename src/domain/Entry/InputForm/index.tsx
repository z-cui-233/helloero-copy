import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonStandard from 'src/shared/components/parts/ButtonStandard';
import TextField from 'src/shared/components/parts/TextField';
import typo from 'src/shared/styles/typo';
import {
  ACTION_TYPE,
  useWabikenEntryContext,
} from 'src/shared/context/WabikenEntryContext';
import MainContainer from 'src/shared/components/parts/MainContainer';

interface FormValues {
  wabiken: string;
}

const initialValues: FormValues = {
  wabiken: '',
};

const validationSchema = Yup.object().shape({
  wabiken: Yup.string()
    .required('シリアルコードは入力必須です。')
    .matches(/^[0-9a-zA-Z]/, 'シリアルコードは半角英数字で入力してください。')
    .length(16, 'シリアルコードは16文字で入力してください。'),
});

const InputForm: React.FC = () => {
  const { state, dispatch } = useWabikenEntryContext();

  const handleOnClick = ({ wabiken }: FormValues): void => {
    dispatch({
      type: ACTION_TYPE.INPUTTED,
      payload: {
        ...state,
        wabiken,
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnClick,
  });

  return (
    <MainContainer>
      <Title>購入した動画の登録</Title>
      <Text>購入時に受け取った、シリアルコードを入力してください。</Text>
      <FieldSection>
        <TextField
          label="シリアルコード"
          fieldOptions={{
            type: 'text',
            name: 'wabiken',
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            value: formik.values.wabiken,
            isError: !!formik.touched.wabiken && !!formik.errors.wabiken,
          }}
          validateMessage={
            formik.touched.wabiken && formik.errors.wabiken
              ? (formik.errors.wabiken as string)
              : ''
          }
        />
      </FieldSection>
      <ButtonSection>
        <ButtonStandard
          onClick={() => formik.handleSubmit()}
          label={'シリアルコードを確認'}
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

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const ButtonSection = styled.div`
  margin: 3rem auto 0;
  text-align: center;
`;

export default InputForm;
