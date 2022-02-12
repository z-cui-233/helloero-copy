import React from 'react';
import styled from 'styled-components';
import typo from '@/shared/styles/typo';

type Props = {
  children: React.ReactNode;
};

const RichTextContainer: React.VFC<Props> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  & > :first-child {
    margin-top: 0 !important;
  }

  ${typo.Standard};
  line-height: 1.8;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.foreground.primary};
    font-weight: bold;
    margin: 1.5em auto 1rem;
    line-height: 1.4;
    width: 100%;
  }

  h1 {
    ${typo.Heading2};
  }

  h2 {
    ${typo.Heading3};
  }
  h3 {
    ${typo.Lead1};
  }
  h4,
  h5,
  h6 {
    ${typo.Lead2};
  }

  h1 + *,
  h2 + *,
  h3 + *,
  h4 + *,
  h5 + *,
  h6 + * {
    margin-top: 0 !important;
  }

  strong {
    color: ${({ theme }) => theme.foreground.primary};
    font-weight: bold;
  }

  a {
    color: ${({ theme }) => theme.foreground.primary};
    text-decoration: underline;
  }

  p {
    color: ${({ theme }) => theme.foreground.secondary};
    font-size: inherit;
    margin: 0.5rem 0 0;
    min-height: 0.5rem;

    &.block-img {
      max-width: 480px;
      margin: 1rem auto 0;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }

  ul,
  ol {
    margin: 1.5rem auto;
    padding: 0 0 0 1.5rem;

    li {
      font-size: inherit;
      list-style-position: outside;

      &:not(:first-child) {
        margin-top: 0.5rem;
      }
    }
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  strong {
    font-weight: bold;
  }

  iframe {
    width: 100%;
  }

  .center-align {
    display: block;
    text-align: center;
    margin-top: 0.5rem;
  }

  .color-warning {
    color: ${({ theme }) => theme.keyColor.error};
    font-weight: bold;
  }

  .color-theme {
    color: ${({ theme }) => theme.keyColor.color4};
    font-weight: bold;
  }

  .font-note {
    ${typo.Note};
    color: ${({ theme }) => theme.foreground.tertiary};
    display: block;

    a {
      font-size: inherit;
    }
  }

  .font-underline {
    text-decoration: underline;
  }
`;

export default RichTextContainer;
