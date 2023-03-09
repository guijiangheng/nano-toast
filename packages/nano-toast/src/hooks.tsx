import React, { ReactElement, useEffect, useState } from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};

const symbol = Symbol();

export const createContext = <T, Params = void>(
  displayName: string,
  useHook: (params: Params) => T,
) => {
  const Context = React.createContext<T>(symbol as T);

  const Provider = ({
    params,
    children,
  }: {
    params: Params;
    children: ReactElement;
  }) => {
    const value = useHook(params);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

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
