import React, { ReactNode } from "react";

const symbol = Symbol();

export const createContext = <T,>(displayName: string) => {
  const Context = React.createContext<T>(symbol as T);

  const Provider = ({ value, children }: { children: ReactNode; value: T }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  Provider.displayName = displayName;

  const useContext = () => {
    const ctx = React.useContext(Context);

    if (ctx === symbol) {
      throw new Error(`useContext must be used within ${displayName}`);
    }

    return ctx;
  };

  return [Provider, useContext, Context] as const;
};
