import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import { ContactType, Response } from 'types/contact';
import { useNationalities } from 'contexts/NationalitiesContext';

const PAGE_SIZE = 50;
const MAX_RECORDS = 1000;

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json: Response) => json.results);

export const useHome = () => {
  const { nationalities } = useNationalities();
  const natQuery = Object.entries(nationalities)
    .filter(([key, value]) => Boolean(value))
    .map(([key]) => key.toLowerCase())
    .join(',');

  const [search, setSearch] = useState('');
  const { data, error, size, setSize } = useSWRInfinite(
    (pageIndex) =>
      `https://randomuser.me/api/?page=${pageIndex + 1}&results=${PAGE_SIZE}${
        natQuery.length ? `&nat=${natQuery}` : ''
      }`,
    fetcher
  );

  const isSearching = Boolean(search);
  const contacts = useMemo(() => (data ? [].concat(...data) : []), [data]);
  const isLoading = !data && !error;
  const isFetching =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

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
      await setSize(size + 1);
    }
  }, [contacts, size, setSize, isFetching, isSearching]);

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
    isError: Boolean(error),
    isFetching,
    isReachingEnd: contacts.length === MAX_RECORDS,
    isSearching,
    search,
    handleSearch,
    handleClearSearch,
  };
};
