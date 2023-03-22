import { Position } from "nano-toast";
import React, { ReactNode, useState } from "react";

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

export const useToasterImpl = () => {
  const [position, setPosition] = useState<Position>("bottom-right");
  const [richColors, setRichColors] = useState(false);
  const [expandByDefault, setExpandByDefault] = useState(false);

  return {
    position,
    setPosition,
    expandByDefault,
    setExpandByDefault,
    richColors,
    setRichColors,
  };
};

export const [ToasterProvider, useToaster] =
  createContext<ReturnType<typeof useToasterImpl>>("ToasterProvider");
