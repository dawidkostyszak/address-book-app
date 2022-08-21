import { ReactNode, useCallback } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorText = styled.h2`
  font-size: 0.75rem;
  color: #bd0d0d;
`;

const RefreshButton = styled.button`
  border: black 1px solid;
  border-radius: 4px;
  padding: 8px;
  background-color: #ffffffff;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

type ErrorProps = {
  children: ReactNode;
};

export const Error = ({ children }: ErrorProps) => {
  const router = useRouter();

  const refresh = useCallback(() => {
    router.reload();
  }, [router]);

  return (
    <Container>
      <ErrorText>{children}</ErrorText>
      <RefreshButton onClick={refresh}>Refresh</RefreshButton>
    </Container>
  );
};
