import styled from 'styled-components';

import { ContactCard } from 'components/ContactCard';
import { Info, Field } from 'components/primitives';

import { useHome } from './useHome';

const HomeContainer = styled.div`
  margin: 32px auto 0;
  width: max-content;
`;

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const Search = styled.div`
  position: sticky;
  top: 0;
  margin-bottom: 32px;
`;

const SearchInfo = styled(Info)`
  margin-top: 8px;
  color: #6495edff;
  font-weight: bold;
`;

export const HomeView = () => {
  const {
    contacts,
    isLoading,
    search,
    isSearching,
    handleSearch,
    handleClearSearch,
  } = useHome();

  return (
    <HomeContainer>
      <Contacts>
        <Search>
          <Field
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
        {isLoading
          ? 'Loading...'
          : contacts.map((contact) => (
              <ContactCard {...contact} key={contact.login.uuid} />
            ))}
      </Contacts>
    </HomeContainer>
  );
};
