import styled from 'styled-components';

import { ContactType } from 'types/contact';
import { Image, Title, Paragraph, Box } from 'components/primitives';

const Card = styled.button`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 8px;
  border: none;
  border-bottom: black 1px solid;
  text-align: left;
  background-color: #ffffff;
  cursor: pointer;

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

type ContactCardProps = {
  thumbnail: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  onClick: () => void;
};

export const ContactCard = ({
  thumbnail,
  firstName,
  lastName,
  username,
  email,
  onClick,
}: ContactCardProps) => (
  <Card onClick={onClick}>
    <ContactImage>
      <Image src={thumbnail} alt={`${firstName} ${lastName}`} />
    </ContactImage>
    <ContactDetails>
      <Title>
        {firstName} {lastName}
      </Title>
      <Box>
        <Paragraph>Username: {username}</Paragraph>
        <Paragraph>Email: {email}</Paragraph>
      </Box>
    </ContactDetails>
  </Card>
);
