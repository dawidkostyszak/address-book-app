import { createContext, ReactNode, useContext, useState } from 'react';
import { NationalitiesTypes } from 'types/nationalities';

const defaultValue = {
  [NationalitiesTypes.CH]: false,
  [NationalitiesTypes.ES]: false,
  [NationalitiesTypes.FR]: false,
  [NationalitiesTypes.GB]: false,
};

export const NationalitiesContext = createContext([]);

type NationalitiesContextProviderProps = {
  children: ReactNode;
};

export const NationalitiesContextProvider = ({
  children,
}: NationalitiesContextProviderProps) => {
  const [nationalities, setNationalities] = useState(defaultValue);

  return (
    <NationalitiesContext.Provider value={[nationalities, setNationalities]}>
      {children}
    </NationalitiesContext.Provider>
  );
};

export const useNationalities = () => {
  const [nationalities, setNationalities] = useContext(NationalitiesContext);

  const updateNationalities = (option: keyof typeof NationalitiesTypes) => {
    setNationalities({
      ...nationalities,
      [option]: !nationalities[option],
    });
  };

  return {
    nationalities,
    updateNationalities,
  };
};
