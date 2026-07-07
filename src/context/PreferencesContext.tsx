import { createContext, useContext } from 'react';

import { usePreferences } from '@/hooks/use-preferences';
import { ClientPreferences } from '@/features/exercise/types';

interface PreferencesContextValue {
  preferences: ClientPreferences;
  updatePreferences: ReturnType<typeof usePreferences>['updatePreferences'];
  isLoading: boolean;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: React.PropsWithChildren) {
  const { preferences, updatePreferences, isLoadingPreferences } =
    usePreferences();

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        isLoading: isLoadingPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferencesContext() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      'usePreferencesContext must be used within a PreferencesProvider',
    );
  }

  return context;
}