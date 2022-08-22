import React, { useCallback, useEffect, useState } from 'react';

import { useContacts, MAX_RECORDS } from 'hooks/useContacts';

export const useHome = () => {
  const [search, setSearch] = useState('');
  const {
    contacts,
    isLoading,
    isSearching,
    isFetching,
    isError,
    isReachingEnd,
    fetchNextPage,
  } = useContacts({ search });

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

  return {
    contacts,
    isLoading,
    isError,
    isFetching,
    isReachingEnd,
    isSearching,
    search,
    handleSearch,
    handleClearSearch,
  };
};
