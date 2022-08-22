import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useNationalities } from 'contexts/NationalitiesContext';
import { useContacts } from './useContacts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

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

jest.mock('contexts/NationalitiesContext', () => ({
  useNationalities: jest.fn(() => ({
    nationalities: {
      es: false,
    },
  })),
}));

const originalFetch = global.fetch;

const mockFetch = jest.fn(() =>
  // @ts-ignore
  Promise.resolve({
    json: () => Promise.resolve({ results: contacts }),
  })
);

describe('useContacts', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = mockFetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('should return contacts when request passed', async () => {
    const { result } = renderHook(() => useContacts(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'api/?page=0&results=50',
      expect.anything()
    );

    expect(result.current).toStrictEqual({
      contacts,
      isLoading: false,
      isFetching: false,
      isError: false,
      isReachingEnd: false,
      fetchNextPage: expect.any(Function),
    });
  });

  it('should send request with nationalities query', async () => {
    (useNationalities as jest.Mock).mockReturnValueOnce({
      nationalities: { es: true },
    });

    const { result } = renderHook(() => useContacts(), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'api/?page=0&results=50&nat=es',
      expect.anything()
    );
  });

  it('should return filtered contacts when pass search param', async () => {
    const { result } = renderHook(() => useContacts({ search: 'John' }), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'api/?page=0&results=50',
      expect.anything()
    );
    expect(result.current).toEqual({
      contacts: [contacts[0]],
      isLoading: false,
      isFetching: false,
      isError: false,
      isReachingEnd: false,
      fetchNextPage: expect.any(Function),
    });
  });

  it('should return isReachingEnd true when fetched MAX_RECORDS', async () => {
    mockFetch.mockImplementationOnce(() =>
      // @ts-ignore
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: Array.from({ length: 1000 }, (v, i) => i),
          }),
      })
    );

    const { result } = renderHook(() => useContacts(), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'api/?page=0&results=50',
      expect.anything()
    );
    expect(result.current).toEqual({
      contacts: expect.any(Array),
      isLoading: false,
      isFetching: false,
      isError: false,
      isReachingEnd: true,
      fetchNextPage: expect.any(Function),
    });
  });
});
