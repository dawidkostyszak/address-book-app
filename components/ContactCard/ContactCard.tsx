import styled from 'styled-components';

import { ContactType } from 'types/contact';
import { Image, Title, Paragraph, Box } from 'components/primitives';

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 8px;
  border-bottom: black 1px solid;

  &:last-of-type {
    border: none;
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  justify-content: space-between;
`;

const ContactImage = styled.div`
  width: 50px;
  height: 50px;
`;

type ContactCardProps = ContactType;

export const ContactCard = ({
  picture,
  name,
  login,
  email,
}: ContactCardProps) => (
  <Card>
    <ContactImage>
      <Image src={picture.thumbnail} />
    </ContactImage>
    <ContactDetails>
      <Title>
        {name.first} {name.last}
      </Title>
      <Box>
        <Paragraph>Username: {login.username}</Paragraph>
        <Paragraph>Email: {email}</Paragraph>
      </Box>
    </ContactDetails>
  </Card>
);
