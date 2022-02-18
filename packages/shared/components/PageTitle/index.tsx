import React from 'react';
import styled from 'styled-components';
import typo from '../../styles/typo';

type Props = {
  text: string;
};

const PageTitle: React.FC<Props> = ({ text }) => <Container>{text}</Container>;

const Container = styled.div`
  ${typo.Heading2};
`;

export default PageTitle;
