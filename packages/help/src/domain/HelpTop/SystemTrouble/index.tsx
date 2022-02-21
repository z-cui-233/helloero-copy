import { PrismicRichText } from '@prismicio/react';
import React from 'react';
import styled from 'styled-components';
import RichTextContainer from '@/localShared/components/RichTextContainer';
import { SystemTroubleDocument } from '@/localShared/lib/prismic/interfaces';
import typo from '@/shared/styles/typo';

type Props = {
  systemTroubleDocument: SystemTroubleDocument;
};

const SystemTrouble: React.FC<Props> = ({ systemTroubleDocument }) =>
  systemTroubleDocument.data.is_show ? (
    <Container>
      <Title>緊急のお知らせ</Title>
      <Text>
        <RichTextContainer>
          <PrismicRichText field={systemTroubleDocument.data.text} />
        </RichTextContainer>
      </Text>
    </Container>
  ) : null;

const Container = styled.div`
  margin: 2rem 0 0;
  padding: 1.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.keyColor.color1};
  border-radius: 0.2rem;
`;

const Title = styled.div`
  ${typo.Lead1};
  font-weight: bold;
`;

const Text = styled.div`
  margin: 1rem 0 0;
`;

export default SystemTrouble;
