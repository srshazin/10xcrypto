import React, { createContext, ReactNode, useContext, useState } from "react";
import { TokenStats } from "../Data/fetchTokens";

interface AppContextStates {
  tokens: TokenStats[] | null;
  setTokens: (tokens: TokenStats[]) => void;
}

const AppContext = createContext<AppContextStates | null>(null);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [tokens, setTokens] = useState<TokenStats[] | null>(null);

  return (
    <AppContext.Provider value={{ tokens, setTokens }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextStates => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext can only be used from within a provider");
  }

  return context;
};
