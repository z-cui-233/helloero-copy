import React from 'react';
import typo from 'src/shared/styles/typo';
import styled from 'styled-components';
import AddIcon from 'src/shared/assets/icon/add.svg';
import PlayIcon from 'src/shared/assets/icon/play_arrow.svg';

interface Props {
  onClick: (e: unknown) => unknown;
  label: string;
  iconType?: ButtonIcons;
}

export const BUTTON_ICONS = {
  ADD: 'add',
  PLAY: 'play',
} as const;
type ButtonIcons = typeof BUTTON_ICONS[keyof typeof BUTTON_ICONS];

const getIcon = (iconType: ButtonIcons): JSX.Element => {
  switch (iconType) {
    case BUTTON_ICONS.ADD:
      return <AddIcon />;

    case BUTTON_ICONS.PLAY:
      return <PlayIcon />;

    default:
      return <div />;
  }
};

const ButtonStandard: React.FC<Props> = ({ onClick, label, iconType }) => {
  const hasIcon = !!iconType;

  return (
    <div>
      <Button onClick={onClick} type="button" hasIcon={hasIcon}>
        {hasIcon && <Icon>{getIcon(iconType)}</Icon>}
        <div>{label}</div>
      </Button>
    </div>
  );
};

const Button = styled.button<{ hasIcon: boolean }>`
  ${typo.Standard};
  appearance: none;
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: bold;

  display: block;
  border: none;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  padding: ${({ hasIcon }) => (hasIcon ? '0 1rem 0 2rem' : '0 1rem')};

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

const Icon = styled.div`
  & svg {
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: 0;
    left: 1rem;
    bottom: 0;
    margin: auto 0;
  }
`;

export default ButtonStandard;
