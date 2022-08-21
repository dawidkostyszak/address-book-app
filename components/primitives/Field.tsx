import { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  z-index: 1;
`;

const Label = styled.label`
  font-size: 1rem;
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
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  placeholder?: string;
  children?: ReactNode;
  label?: string;
};

export const Field = ({ id, value, children, label, ...rest }: FieldProps) => (
  <InputContainer>
    <Input id={id} name={id} value={value} {...rest} />
    {label ? <Label htmlFor={id}>{label}</Label> : null}
    {children}
  </InputContainer>
);

type SearchFieldProps = FieldProps & {
  onClear: () => void;
};

export const SearchField = ({ onClear, value, ...rest }: SearchFieldProps) => (
  <Field type="text" value={value} {...rest}>
    {value ? <Close onClick={onClear}>X</Close> : null}
  </Field>
);

type CheckboxProps = FieldProps & {
  checked: boolean;
};

export const CheckboxField = (props: CheckboxProps) => (
  <Field type="checkbox" {...props} />
);
