import { render, screen, fireEvent } from '@testing-library/react';

import { Error } from './Error';

const mockReload = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    reload: mockReload,
  }),
}));

describe('Error', () => {
  it('renders error message', () => {
    render(<Error>Error message</Error>);

    const errorMessage = screen.getByRole('heading', {
      name: /Error message/i,
    });

    expect(errorMessage).toBeInTheDocument();
  });

  it('renders refresh button', () => {
    render(<Error>Error message</Error>);

    const refreshButton = screen.getByRole('button', {
      name: /Refresh/i,
    });

    expect(refreshButton).toBeInTheDocument();
  });

  it('should call refresh the page when click on button', () => {
    render(<Error>Error message</Error>);

    const refreshButton = screen.getByRole('button', {
      name: /Refresh/i,
    });
    fireEvent.click(refreshButton);

    expect(mockReload).toHaveBeenCalledTimes(1);
  });
});
