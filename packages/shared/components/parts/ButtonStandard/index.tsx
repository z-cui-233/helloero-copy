import React from 'react';
import typo from '../../../styles/typo';
import styled from 'styled-components';
import AddIcon from '../../../assets/icon/add.svg';
import PlayIcon from '../../../assets/icon/play_arrow.svg';

interface Props {
  onClick: (e: unknown) => unknown;
  label: string;
  iconType?: ButtonIcons;
  disabled?: boolean;
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

const ButtonStandard: React.FC<Props> = ({
  onClick,
  label,
  iconType,
  disabled,
}) => {
  const hasIcon = !!iconType;

  return (
    <div>
      <Button
        onClick={onClick}
        type="button"
        hasIcon={hasIcon}
        disabled={disabled}
      >
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
  max-width: 260px;
  margin: 0 auto;
  position: relative;
  padding: ${({ hasIcon }) => (hasIcon ? '0 1.5rem 0 2rem' : '0 1rem')};

  height: 3.5rem;
  background-color: ${({ theme }) => theme.keyColor.color1};
  color: ${({ theme }) => theme.foreground.primaryInverted};
  transition: color 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.foreground.primary};

    path {
      fill: ${({ theme }) => theme.foreground.primary};
    }
  }
`;

const Icon = styled.div`
  & svg {
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 0;
    left: 0.5rem;
    bottom: 0;
    margin: auto 0;

    path {
      transition: fill 0.3s ease-out;
    }
  }
`;

export default ButtonStandard;
