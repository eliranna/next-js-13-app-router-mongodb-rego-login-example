'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Define the shape of the context state
interface EditModeContextState {
  isEditMode: boolean;
  toggleEditMode: () => void;
}

// Create a context with an undefined initial value but with the shape of EditModeContextState
const EditModeContext = createContext<EditModeContextState | undefined>(undefined);

// Define the type for the props of the provider component
interface EditModeProviderProps {
  children: ReactNode;
}

// Create the provider component
export const EditModeProvider: React.FC<EditModeProviderProps> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prevMode) => !prevMode);
  }, []);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

// Custom hook to use the edit mode context
export const useEditMode = (): EditModeContextState => {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
};
