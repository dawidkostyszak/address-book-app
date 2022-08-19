import { useCallback, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import { Response } from 'types/contact';

const PAGE_SIZE = 50;
const MAX_RECORDS = 1000;

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json: Response) => json.results);
const getUrl = (pageIndex) =>
  `https://randomuser.me/api/?page=${pageIndex}&results=${PAGE_SIZE}`;

export const useHome = () => {
  const { data, error, size, setSize } = useSWRInfinite(getUrl, fetcher);

  const contacts = useMemo(() => (data ? [].concat(...data) : []), [data]);
  const isLoading = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isFetching =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const isScrolling = useCallback(async () => {
    if (
      isFetching ||
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight
    ) {
      return;
    }

    if (contacts.length < MAX_RECORDS) {
      await setSize(size + 1);
    }
  }, [contacts, size, setSize, isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, [isScrolling]);

  return {
    contacts,
    isLoading,
    isFetching,
    isReachingEnd:
      isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE),
  };
};
