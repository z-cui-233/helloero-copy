import React from 'react';
import styled from 'styled-components';
import Script from 'next/script';
import { globalConfig } from 'src/globalConfig';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import LayoutH2u from '@/shared/components/LayoutH2u';
import typo from '@/shared/styles/typo';

const Internal: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();

  return (
    <LayoutH2u options={globalConfig}>
      <Container>
        <FieldSection>
          <Title>LoginStatus</Title>
          <Detail>{userInfo.isLoggedIn ? 'Logged in' : 'Not Logged in'}</Detail>
        </FieldSection>
        <FieldSection>
          <Title>UserName</Title>
          <Detail>{userInfo.userInfo?.username}</Detail>
        </FieldSection>
        <FieldSection>
          <Title>UserInfo</Title>
          <Detail>
            <JsonData>
              {isLoadedUserInfo && (
                <pre>
                  <code className=" prettyprint">
                    {JSON.stringify(userInfo, null, 2)}
                  </code>
                </pre>
              )}
            </JsonData>
          </Detail>
        </FieldSection>
        <Script
          strategy="lazyOnload"
          src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?lang-js"
          onLoad={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).PR.prettyPrint();
          }}
        />
      </Container>
    </LayoutH2u>
  );
};

const Container = styled.div`
  max-width: 840px;
  margin: 4rem auto 0;
  width: calc(100% - 2rem);
`;

const FieldSection = styled.div`
  margin: 1rem 0 0;
`;

const Title = styled.div`
  ${typo.Lead1};
  font-weight: bold;
  font-weight: bold;
`;

const Detail = styled.div`
  ${typo.Standard};
  margin: 0.5rem 0 0;
  min-height: 1em;
`;

const JsonData = styled.div`
  ${typo.Body};
  background-color: ${({ theme }) => theme.keyColor.color3};
  padding: 1.5rem;
  overflow: scroll;
  font-family: sans-serif;
`;

export default Internal;
