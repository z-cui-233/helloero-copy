import React, { HTMLAttributes, useEffect, useRef } from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';
import FormValidateMessage from '../FormValidateMessage';

interface CustomProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  isError?: boolean;
}

type Props = {
  validateMessage?: string;
  fieldOptions?: CustomProps;
};

const FormTextAreaField: React.FC<Props> = ({
  validateMessage,
  fieldOptions,
}) => {
  const textAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.innerText = fieldOptions?.defaultValue
        ? (fieldOptions.defaultValue as string)
        : '';
    }
  }, [fieldOptions?.defaultValue]);

  return (
    <div>
      <div>
        <TextArea
          role="textbox"
          ref={textAreaRef}
          aria-multiline={true}
          contentEditable={true}
          {...fieldOptions}
        />
      </div>
      {validateMessage && <FormValidateMessage message={validateMessage} />}
    </div>
  );
};

const TextArea = styled.div<CustomProps>`
  ${typo.Standard};
  background-color: ${({ theme }) => theme.background.primary};
  border: 2px solid
    ${({ theme, isError = false }) =>
      isError ? theme.keyColor.color5 : theme.foreground.tertiary};
  box-shadow: none;
  color: ${({ theme }) => theme.foreground.primary};
  display: block;
  width: 100%;
  overflow: hidden;
  resize: vertical;
  min-height: 6rem;
  line-height: 1.6;
  padding: 0.5rem;
  position: relative;

  &[contenteditable] {
    &:empty::before {
      ${typo.Standard};
      content: ${({ placeholder }) => (placeholder ? `"${placeholder}"` : '')};
      color: ${({ theme }) => theme.foreground.tertiary};
      display: block;
      line-height: 1.6;
    }
  }
`;

export default React.memo(FormTextAreaField);
