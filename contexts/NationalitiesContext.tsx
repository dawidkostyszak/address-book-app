import { createContext, ReactNode, useContext, useState } from 'react';
import { NationalitiesTypes } from 'types/nationalities';

const STORAGE_KEY = 'nationalities';

export const defaultValue = {
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
  const [nationalities, setNationalities] = useState(() => {
    let loadedNationalities;
    if (typeof window !== 'undefined') {
      loadedNationalities = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    return loadedNationalities || defaultValue;
  });

  return (
    <NationalitiesContext.Provider value={[nationalities, setNationalities]}>
      {children}
    </NationalitiesContext.Provider>
  );
};

export const useNationalities = () => {
  const [nationalities, setNationalities] = useContext(NationalitiesContext);

  const updateNationalities = (option: keyof typeof NationalitiesTypes) => {
    const nationalitiesToSave = {
      ...nationalities,
      [option]: !nationalities[option],
    };
    setNationalities(nationalitiesToSave);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nationalitiesToSave));
  };

  return {
    nationalities,
    updateNationalities,
  };
};
