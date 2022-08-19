import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  z-index: 1;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  border: none;
  background-color: white;
  cursor: pointer;
`;

type FieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onClear: () => void;
};

export const Field = ({ onClear, value, ...rest }) => (
  <InputContainer>
    <Input value={value} {...rest} />
    {value ? <Close onClick={onClear}>X</Close> : null}
  </InputContainer>
);
