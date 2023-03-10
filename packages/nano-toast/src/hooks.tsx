import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
};

export const useEventCallback = <T extends (...args: any[]) => any>(fn: T) => {
  const ref = useRef(fn);

  useEffect(() => {
    ref.current = fn;
  });

  return useCallback(
    (...args: Parameters<T>): ReturnType<T> => ref.current(...args),
    [],
  );
};

const symbol = Symbol();

export const createContext = <T, Params>(
  displayName: string,
  useHook: (params?: Params) => T,
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
  const remainingTimeRef = useRef(duration);
  const startTimeRef = useRef<number>();
  const timeoutIdRef = useRef<number>();

  const stop = useCallback(() => {
    if (timeoutIdRef.current) {
      remainingTimeRef.current -= Date.now() - startTimeRef.current!;
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    if (remainingTimeRef.current > 0) {
      startTimeRef.current = Date.now();
      timeoutIdRef.current = setTimeout(() => {
        onTimeout();
        timeoutIdRef.current = undefined;
      }, remainingTimeRef.current);

      return stop;
    } else {
      onTimeout();
    }
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
      (typeof p === 'function' ? p() : p)
        .then((data) => setValue(data))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [p]);

  return { loading, error, value };
};
