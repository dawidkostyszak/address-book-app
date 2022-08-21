import { NationalitiesTypes } from 'types/nationalities';
import { useNationalities } from 'contexts/NationalitiesContext';

export const useSettings = () => {
  const { nationalities, updateNationalities } = useNationalities();

  const onChangeNationalitiesOptions =
    (option: keyof typeof NationalitiesTypes) => () => {
      updateNationalities(option);
    };

  return {
    nationalities,
    onChangeNationalitiesOptions,
  };
};
