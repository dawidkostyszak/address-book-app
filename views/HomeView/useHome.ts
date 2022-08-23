import React, { useCallback, useEffect, useState } from 'react';

import { useContacts, MAX_RECORDS } from 'hooks/useContacts';

export const useHome = () => {
  const [search, setSearch] = useState('');
  const [modalData, setModalData] = useState(null);
  const {
    contacts,
    isLoading,
    isFetching,
    isError,
    isReachingEnd,
    fetchNextPage,
  } = useContacts({ search });
  const isSearching = Boolean(search);

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

  const handleOpenModal = (contactDetails) => {
    setModalData(contactDetails);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return {
    contacts,
    isLoading,
    isError,
    isFetching,
    isReachingEnd,
    isSearching,
    search,
    modalData,
    handleOpenModal,
    handleCloseModal,
    handleSearch,
    handleClearSearch,
  };
};
