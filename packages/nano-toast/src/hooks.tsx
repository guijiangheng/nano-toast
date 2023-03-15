import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};

const symbol = Symbol();

export const createContext = <T, Params>(
  displayName: string,
  useHook: (params?: Params) => T
) => {
  const Context = React.createContext<T>(symbol as T);

  const Provider = ({
    params,
    children,
  }: {
    params?: Params;
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

export interface useTimeoutParams {
  duration: number;
  onTimeout: () => void;
}

export const useTimeout = ({ duration, onTimeout }: useTimeoutParams) => {
  const timeoutIdRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const remainingTimeRef = useRef(duration);

  const stop = useCallback(() => {
    if (timeoutIdRef.current) {
      remainingTimeRef.current -= Date.now() - startTimeRef.current!;
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = undefined;
      onTimeout();
    }, remainingTimeRef.current);

    return stop;
  }, [onTimeout, stop]);

  return { start, stop };
};

export const usePromise = <T,>(p?: Promise<T> | (() => Promise<T>)) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<T>();

  useEffect(() => {
    if (p) {
      setLoading(true);
      setError(undefined);
      setValue(undefined);
      (typeof p === "function" ? p() : p)
        .then((data) => setValue(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [p]);

  return { loading, error, value };
};
