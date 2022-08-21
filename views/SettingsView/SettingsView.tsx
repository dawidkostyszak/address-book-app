import styled from 'styled-components';

import { CheckboxField, Link } from 'components/primitives';
import { NationalitiesTypes } from 'types/nationalities';
import { useSettings } from './useSettings';

const SettingsContainer = styled.div`
  margin: 32px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 500px;
`;

export const SettingsView = () => {
  const { nationalities, onChangeNationalitiesOptions } = useSettings();

  return (
    <SettingsContainer>
      Select nationalities to filter in a search.
      <CheckboxField
        id="CH"
        onChange={onChangeNationalitiesOptions(NationalitiesTypes.CH)}
        label="CH"
        checked={nationalities[NationalitiesTypes.CH]}
      />
      <CheckboxField
        id="ES"
        onChange={onChangeNationalitiesOptions(NationalitiesTypes.ES)}
        label="ES"
        checked={nationalities[NationalitiesTypes.ES]}
      />
      <CheckboxField
        id="FR"
        onChange={onChangeNationalitiesOptions(NationalitiesTypes.FR)}
        label="FR"
        checked={nationalities[NationalitiesTypes.FR]}
      />
      <CheckboxField
        id="GB"
        onChange={onChangeNationalitiesOptions(NationalitiesTypes.GB)}
        label="GB"
        checked={nationalities[NationalitiesTypes.GB]}
      />
      <Link href="/" passHref>
        Go to search
      </Link>
    </SettingsContainer>
  );
};
