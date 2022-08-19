import styled from 'styled-components';

import { ContactCard } from 'components/ContactCard';

import { useHome } from './useHome';

const HomeContainer = styled.div`
  margin: 0 auto;
  width: max-content;
`;

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

export const HomeView = () => {
  const { contacts, isLoading } = useHome();

  return (
    <HomeContainer>
      <Contacts>
        {isLoading
          ? 'Loading...'
          : contacts.map((contact) => (
              <ContactCard {...contact} key={contact.login.uuid} />
            ))}
      </Contacts>
    </HomeContainer>
  );
};
