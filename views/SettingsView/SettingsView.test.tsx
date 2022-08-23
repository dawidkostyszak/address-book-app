import { render, screen, fireEvent } from '@testing-library/react';

import { withThemeWrapper } from 'utils/testing';
import { SettingsView } from './SettingsView';

const mockUpdateNationalities = jest.fn();

jest.mock('contexts/NationalitiesContext', () => ({
  useNationalities: jest.fn(() => ({
    nationalities: {
      CH: false,
      ES: false,
      FR: false,
      GB: false,
    },
    updateNationalities: mockUpdateNationalities,
  })),
}));

describe('SettingsView', () => {
  it('should renders checkboxes to filter by nationalities', () => {
    render(withThemeWrapper(<SettingsView />));

    expect(screen.getByLabelText('CH')).toBeInTheDocument();
    expect(screen.getByLabelText('ES')).toBeInTheDocument();
    expect(screen.getByLabelText('FR')).toBeInTheDocument();
    expect(screen.getByLabelText('GB')).toBeInTheDocument();
  });

  it('should update nationalities option when click on checkbox', () => {
    render(withThemeWrapper(<SettingsView />));

    fireEvent.click(screen.getByLabelText('CH'));

    expect(mockUpdateNationalities).toHaveBeenCalledWith('CH');
  });

  it('should render link to search page', () => {
    render(withThemeWrapper(<SettingsView />));

    expect(screen.getByText('Go to search')).toBeInTheDocument();
  });
});
