// contexts/FocusContext.tsx
import React, { createContext, useState } from "react";

type FocusContextType = {
  focusOn: boolean;
  setFocusOn: (value: boolean) => void;
};

export const FocusContext = createContext<FocusContextType>({
  focusOn: false,
  setFocusOn: () => {},
});

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [focusOn, setFocusOn] = useState(false);

  return (
    <FocusContext.Provider value={{ focusOn, setFocusOn }}>
      {children}
    </FocusContext.Provider>
  );
}
