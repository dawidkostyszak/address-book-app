import { render, screen } from '@testing-library/react';

import { ContactDetailsModal } from './ContactDetailsModal';

const contact = {
  location: {
    street: {
      name: 'Rue Abel-Gance',
      number: 7852,
    },
    city: 'Santa Maria In Calanca',
    state: 'Jura',
    postcode: '5868',
    country: '',
    coordinates: {
      latitude: '',
      longitude: '',
    },
    timezone: {
      offset: '',
      description: '',
    },
  },
  phone: '079 608 38 73',
  cell: '076 629 15 84',
};

describe('ContactDetailsModal', () => {
  it('renders contact details', () => {
    const { location, phone, cell } = contact;
    render(
      <ContactDetailsModal contact={contact} isOpen onClose={jest.fn()} />
    );

    expect(
      screen.getByText(`${location.street.name} ${location.street.number}`)
    ).toBeInTheDocument();
    expect(screen.getByText(location.city)).toBeInTheDocument();
    expect(screen.getByText(location.state)).toBeInTheDocument();
    expect(screen.getByText(location.postcode)).toBeInTheDocument();
    expect(screen.getByText(phone)).toBeInTheDocument();
    expect(screen.getByText(cell)).toBeInTheDocument();
  });
});
