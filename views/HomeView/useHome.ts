import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { ContactType, Response } from 'types/contact';
import { useNationalities } from 'contexts/NationalitiesContext';

const PAGE_SIZE = 50;
const MAX_RECORDS = 1000;

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

export const useHome = () => {
  const { nationalities } = useNationalities();
  const natQuery = Object.entries(nationalities)
    .filter(([key, value]) => Boolean(value))
    .map(([key]) => key.toLowerCase())
    .join(',');

  const [search, setSearch] = useState('');

  const { data, isLoading, isError, isFetching, fetchNextPage } =
    useInfiniteQuery(['contacts', { natQuery }], fetcher, {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    });

  const isSearching = Boolean(search);
  const contacts = useMemo(
    () => (data ? [].concat(...data.pages) : []),
    [data]
  );

  const isScrolling = useCallback(async () => {
    if (
      isSearching ||
      isFetching ||
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight
    ) {
      return;
    }

    if (contacts.length < MAX_RECORDS) {
      await fetchNextPage();
    }
  }, [contacts, fetchNextPage, isFetching, isSearching]);

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, [isScrolling]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const filteredContacts = isSearching
    ? contacts.filter(({ name: { first, last } }: ContactType) =>
        `${first.toLowerCase()} ${last.toLowerCase()}`.includes(
          search.toLowerCase()
        )
      )
    : contacts;

  return {
    contacts: filteredContacts,
    isLoading,
    isError,
    isFetching,
    isReachingEnd: contacts.length === MAX_RECORDS,
    isSearching,
    search,
    handleSearch,
    handleClearSearch,
  };
};
