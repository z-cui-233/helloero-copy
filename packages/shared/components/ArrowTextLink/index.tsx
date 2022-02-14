import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import IconArrow from '../../assets/icon/arrow_right.svg';
import typo from '../../styles/typo';

type Props = {
  href: string;
  text: string;
  target?: '_self' | '_blank';
};

const ArrowTextLink: React.FC<Props> = ({ href, text, target = '_self' }) => (
  <Link href={href} passHref>
    <StyledLink target={target}>
      {text}
      <Icon>
        <IconArrow />
      </Icon>
    </StyledLink>
  </Link>
);

const StyledLink = styled.a`
  ${typo.Standard};
  color: ${({ theme }) => theme.foreground.primary};
  font-weight: normal;
  display: inline-block;
  position: relative;
  padding: 0.25rem 1rem 0.25rem 0;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.background.quinary};

  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.background.quinary};
  }
`;

const Icon = styled.div`
  & svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto 0;
    width: 0.7rem;
    height: 0.7rem;
    display: block;
  }
`;

export default ArrowTextLink;
