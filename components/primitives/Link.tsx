import { ReactNode } from 'react';
import styled from 'styled-components';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

const StyledLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

type LinkProps = NextLinkProps & {
  children: ReactNode;
};

export const Link = ({ children, ...rest }: LinkProps) => (
  <NextLink {...rest}>
    <StyledLink>{children}</StyledLink>
  </NextLink>
);
