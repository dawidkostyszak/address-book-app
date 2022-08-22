import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { useNationalities } from 'contexts/NationalitiesContext';
import { ContactType, Response } from 'types/contact';

export const PAGE_SIZE = 50;
export const MAX_RECORDS = 1000;

const fetcher = ({ pageParam = 0, queryKey }) => {
  const { natQuery } = queryKey[1];
  return fetch(
    `api/?page=${pageParam}&results=${PAGE_SIZE}${
      natQuery.length ? `&nat=${natQuery}` : ''
    }`,
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        'access-control-allow-origin': '*',
      },
    }
  )
    .then((res) => res.json())
    .then((json: Response) => json.results);
};

const searchContacts = (contacts: ContactType[], search: string) =>
  contacts.filter(({ name: { first, last } }: ContactType) =>
    `${first.toLowerCase()} ${last.toLowerCase()}`.includes(
      search.toLowerCase()
    )
  );

type UseContactsInput = {
  search?: string;
};

export const useContacts = ({ search }: UseContactsInput = {}) => {
  const { nationalities } = useNationalities();
  const natQuery = Object.entries(nationalities)
    .filter(([key, value]) => Boolean(value))
    .map(([key]) => key.toLowerCase())
    .join(',');

  const { data, isLoading, isError, isFetching, fetchNextPage } =
    useInfiniteQuery(['contacts', { natQuery }], fetcher, {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

  const contacts = useMemo(
    () => (data ? [].concat(...data.pages) : []),
    [data]
  );

  return {
    contacts: Boolean(search) ? searchContacts(contacts, search) : contacts,
    isLoading,
    isFetching,
    isError,
    isReachingEnd: contacts.length === MAX_RECORDS,
    fetchNextPage,
  };
};
