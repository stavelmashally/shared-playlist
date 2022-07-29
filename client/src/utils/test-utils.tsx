import { AppProvider } from '../providers/AppProviders';
import { PlaylistProvider } from '../providers/PlaylistProvider';
import { render as rtlRender } from '@testing-library/react';

export function renderWithProviders(ui: React.ReactElement) {
  return {
    ...rtlRender(
      <AppProvider>
        <PlaylistProvider>{ui}</PlaylistProvider>
      </AppProvider>
    ),
  };
}
