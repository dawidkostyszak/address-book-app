import styled from 'styled-components';

import { ContactCard } from 'components/ContactCard';
import { Info, SearchField, Link } from 'components/primitives';
import { Error } from 'components/Error';

import { useHome } from './useHome';

const HomeContainer = styled.div`
  margin: 32px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 50px;
  width: 500px;
`;

const Search = styled.div`
  margin-bottom: 32px;
  width: 100%;
  margin-right: 8px;
  max-width: 400px;
`;

const SearchInfo = styled(Info)`
  margin-top: 8px;
  color: #6495edff;
  font-weight: bold;
`;

const DataInfo = styled(Info)`
  color: #6495edff;
`;

const Loading = styled.div`
  &:after {
    content: ' .';
    animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots {
    0%,
    20% {
      color: rgba(white, 0);
      text-shadow: 0.25em 0 0 rgba(white, 0), 0.5em 0 0 rgba(white, 0);
    }
    40% {
      color: black;
      text-shadow: 0.25em 0 0 rgba(white, 0), 0.5em 0 0 rgba(white, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(white, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
    }
  }
`;

const Filters = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: baseline;
  background-color: #ffffff;
`;

const LinkContainer = styled.div`
  position: absolute;
  right: 32px;
  padding: 8px;
`;

export const HomeView = () => {
  const {
    contacts,
    search,
    isLoading,
    isError,
    isFetching,
    isSearching,
    isReachingEnd,
    handleSearch,
    handleClearSearch,
  } = useHome();

  if (isError) {
    return (
      <Error>Error occurred for request to https://randomuser.me/api.</Error>
    );
  }

  return (
    <HomeContainer>
      <Filters>
        <Search>
          <SearchField
            id="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search"
            onClear={handleClearSearch}
          />
          {isSearching ? (
            <SearchInfo>
              Loading new contacts is disabled while searching.
            </SearchInfo>
          ) : null}
        </Search>
        <LinkContainer>
          <Link href="/settings" passHref>
            Go to settings
          </Link>
        </LinkContainer>
      </Filters>
      <Contacts>
        {isLoading
          ? null
          : contacts.map(({ picture, name, login, email }) => (
              <ContactCard
                thumbnail={picture.thumbnail}
                firstName={name.first}
                lastName={name.last}
                username={login.username}
                email={email}
                key={login.uuid}
              />
            ))}
        {isLoading || isFetching ? <Loading>Loading</Loading> : null}
        {isReachingEnd ? <DataInfo>End of users catalog</DataInfo> : null}
      </Contacts>
    </HomeContainer>
  );
};
