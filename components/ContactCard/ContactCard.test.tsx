import { render, screen } from '@testing-library/react';

import { ContactCard } from './ContactCard';

const contact = {
  thumbnail: 'thumbnail-image',
  firstName: 'John',
  lastName: 'Smith',
  username: 'john.smith',
  email: 'john.smith@example.com',
};

describe('ContactCard', () => {
  it('renders contact details', () => {
    render(<ContactCard {...contact} />);

    expect(
      screen.getByRole('img', {
        name: `${contact.firstName} ${contact.lastName}`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: `${contact.firstName} ${contact.lastName}`,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Username: ${contact.username}`, { exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Email: ${contact.email}`, { exact: false })
    ).toBeInTheDocument();
  });
});
