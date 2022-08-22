import { renderHook, act } from '@testing-library/react';
import {
  defaultValue,
  NationalitiesContextProvider,
  useNationalities,
} from './NationalitiesContext';
import { NationalitiesTypes } from 'types/nationalities';

const wrapper = ({ children }) => (
  <NationalitiesContextProvider>{children}</NationalitiesContextProvider>
);

describe('NationalitiesContext', () => {
  it('should use custom step when incrementing', () => {
    const { result } = renderHook(() => useNationalities(), { wrapper });

    expect(result.current.nationalities).toStrictEqual(defaultValue);
  });

  it('should update nationalities values', () => {
    const { result } = renderHook(() => useNationalities(), { wrapper });

    act(() => {
      result.current.updateNationalities(NationalitiesTypes.ES);
    });

    expect(result.current.nationalities).toStrictEqual({
      ...defaultValue,
      [NationalitiesTypes.ES]: true,
    });
  });
});
