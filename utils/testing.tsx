import { ThemeProvider } from 'styled-components';

import { theme } from './theme';

export const withThemeWrapper = (children) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
