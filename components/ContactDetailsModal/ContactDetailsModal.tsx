import styled from 'styled-components';

import { Modal, ModalProps } from 'components/Modal';
import { ContactType } from 'types/contact';
import { Title, SubTitle } from 'components/primitives';

type ContactDetailsModalProps = Omit<ModalProps, 'children'> & {
  contact: Pick<ContactType, 'location' | 'phone' | 'cell'>;
};

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  width: 500px;
`;

export const ContactDetailsModal = ({
  contact,
  ...modalProps
}: ContactDetailsModalProps) => (
  <Modal {...modalProps}>
    <Details>
      <DetailsRow>
        <Title>Street</Title>
        <SubTitle>
          {contact?.location.street.name} {contact?.location.street.number}
        </SubTitle>
      </DetailsRow>
      <DetailsRow>
        <Title>City</Title>
        <SubTitle>{contact?.location.city}</SubTitle>
      </DetailsRow>
      <DetailsRow>
        <Title>State</Title>
        <SubTitle>{contact?.location.state}</SubTitle>
      </DetailsRow>
      <DetailsRow>
        <Title>Postcode</Title>
        <SubTitle>{contact?.location.postcode}</SubTitle>
      </DetailsRow>
      <DetailsRow>
        <Title>Phone</Title>
        <SubTitle>{contact?.phone}</SubTitle>
      </DetailsRow>
      <DetailsRow>
        <Title>Cell</Title>
        <SubTitle>{contact?.cell}</SubTitle>
      </DetailsRow>
    </Details>
  </Modal>
);
