import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { globalConfig } from 'src/globalConfig';
import { useLoginStateContext } from '@/shared/context/LoginStateContext';
import LayoutH2u from '@/shared/components/LayoutH2u';
import typo from '@/shared/styles/typo';
import MainContainer from '@/shared/components/parts/MainContainer';
import useAmplifyAuth from '@/shared/hooks/useAmplifyAuth';

const Internal: React.FC = () => {
  const { isLoadedUserInfo, userInfo } = useLoginStateContext();
  const { currentAuthenticatedUser } = useAmplifyAuth();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (!isLoadedUserInfo) {
      return;
    }
    currentAuthenticatedUser().then((response) =>
      setUser(response.data ?? undefined)
    );
  }, [currentAuthenticatedUser, isLoadedUserInfo]);

  return (
    <LayoutH2u options={globalConfig}>
      <MainContainer size="large">
        <FieldSection>
          <Title>LoginStatus</Title>
          <Detail>
            <JsonData>
              <pre>
                {JSON.stringify(
                  { isLoggedIn: isLoadedUserInfo ? userInfo.isLoggedIn : '--' },
                  null,
                  2
                )}
              </pre>
            </JsonData>
          </Detail>
        </FieldSection>
        <FieldSection>
          <Title>UserName</Title>
          <Detail>
            <JsonData>
              <pre>
                {JSON.stringify(
                  { userName: isLoadedUserInfo ? userInfo.userName : '--' },
                  null,
                  2
                )}
              </pre>
            </JsonData>
          </Detail>
        </FieldSection>
        <FieldSection>
          <Title>CognitoUser</Title>
          <Detail>
            <JsonData>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </JsonData>
          </Detail>
        </FieldSection>
      </MainContainer>
    </LayoutH2u>
  );
};

const FieldSection = styled.div`
  margin: 2rem 0 0;
`;

const Title = styled.div`
  ${typo.Lead2};
  font-weight: bold;
  font-family: monospace, sans-serif;
`;

const Detail = styled.div`
  ${typo.Standard};
  margin: 0.5rem 0 0;
  min-height: 1em;
`;

const JsonData = styled.div`
  ${typo.Body};
  background-color: ${({ theme }) => theme.background.tertiary};
  padding: 1rem;
  overflow: scroll;
  font-family: monospace, sans-serif;
`;

export default Internal;
