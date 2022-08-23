import { render, screen, fireEvent } from '@testing-library/react';

import { useContacts as mockUseContacts } from 'hooks/useContacts';
import { HomeView } from './HomeView';
import { withThemeWrapper } from 'utils/testing';

const contacts = [
  {
    name: {
      first: 'John',
      last: 'Smith',
    },
    email: 'john.smith@example.com',
    login: {
      uuid: '1',
      username: 'john.smith',
    },
    picture: {
      thumbnail: 'image',
    },
  },
  {
    name: {
      first: 'Foo',
      last: 'Bar',
    },
    email: 'foo.bar@example.com',
    login: {
      uuid: '2',
      username: 'foo.bar',
    },
    picture: {
      thumbnail: 'image2',
    },
  },
];

jest.mock('hooks/useContacts', () => ({
  useContacts: jest.fn(),
}));

describe('HomeView', () => {
  beforeAll(() => {
    (mockUseContacts as jest.Mock).mockReturnValue({
      contacts,
      isLoading: false,
      isSearching: false,
      isFetching: false,
      isError: false,
      isReachingEnd: false,
      fetchNextPage: jest.fn(),
    });
  });

  it('renders list of contacts', () => {
    render(withThemeWrapper(<HomeView />));

    expect(
      screen.getByText(`${contacts[0].name.first} ${contacts[0].name.last}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${contacts[1].name.first} ${contacts[1].name.last}`)
    ).toBeInTheDocument();
  });

  it('should show search information when search', () => {
    render(withThemeWrapper(<HomeView />));

    fireEvent.change(screen.getByPlaceholderText('Search'), {
      target: { value: 'John' },
    });
    expect(
      screen.getByText('Loading new contacts is disabled while searching.')
    ).toBeInTheDocument();
  });

  it('should render link to settings page', () => {
    render(withThemeWrapper(<HomeView />));

    expect(screen.getByText('Go to settings')).toBeInTheDocument();
  });

  it('should show loading text when isLoading', () => {
    (mockUseContacts as jest.Mock).mockReturnValueOnce({
      contacts: [],
      isLoading: true,
      isSearching: false,
      isFetching: false,
      isError: false,
      isReachingEnd: false,
      fetchNextPage: jest.fn(),
    });

    render(withThemeWrapper(<HomeView />));

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should show loading text when isFetching', () => {
    (mockUseContacts as jest.Mock).mockReturnValueOnce({
      contacts: [],
      isLoading: false,
      isSearching: false,
      isFetching: true,
      isError: false,
      isReachingEnd: false,
      fetchNextPage: jest.fn(),
    });

    render(withThemeWrapper(<HomeView />));

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should show end of users message', () => {
    (mockUseContacts as jest.Mock).mockReturnValueOnce({
      contacts,
      isLoading: false,
      isSearching: false,
      isFetching: false,
      isError: false,
      isReachingEnd: true,
      fetchNextPage: jest.fn(),
    });

    render(withThemeWrapper(<HomeView />));

    expect(screen.getByText('End of users catalog')).toBeInTheDocument();
  });

  it('should show error message', () => {
    (mockUseContacts as jest.Mock).mockReturnValueOnce({
      contacts: [],
      isLoading: false,
      isSearching: false,
      isFetching: false,
      isError: true,
      isReachingEnd: false,
      fetchNextPage: jest.fn(),
    });

    render(withThemeWrapper(<HomeView />));

    expect(
      screen.getByText(
        'Error occurred for request to https://randomuser.me/api.'
      )
    ).toBeInTheDocument();
  });
});
