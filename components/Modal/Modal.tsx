import { ReactNode } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 16px;
`;

const ModalBody = styled.div`
  margin-top: 40px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: #ffffff;
  padding: 8px;
  align-self: flex-end;
  font-size: 1.5rem;
`;

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={handleStopPropagation}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};
