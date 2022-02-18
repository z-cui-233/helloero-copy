import { css } from 'styled-components';

// 36
const Heading1 = css`
  font-size: 2.25rem;
  font-weight: bold;
  line-height: 1.4;
`;

// 32
const Heading2 = css`
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.4;
`;

// 24
const Heading3 = css`
  font-size: 1.75rem;
  font-weight: bold;
  line-height: 1.4;
`;

// 20
const Lead1 = css`
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.4;
`;

// 18
const Lead2 = css`
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.4;
`;

// 16
const Standard = css`
  font-size: 1rem;
`;

// 14
const Body = css`
  font-size: 0.875rem;
`;

// 12
const Note = css`
  font-size: 0.75rem;
`;

const typo = {
  Heading1,
  Heading2,
  Heading3,
  Lead1,
  Lead2,
  Standard,
  Body,
  Note,
};

export default typo;
