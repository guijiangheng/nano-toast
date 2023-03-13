import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react';

import { createContext } from './hooks';
import { Subject } from './subject';

export type ToastType = 'normal' | 'info' | 'success' | 'error' | 'promise';

export type ToastData = {
  id: number;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  duration?: number;
  promise?: Promise<any> | (() => Promise<any>);
};

export type ToastOptions = Omit<ToastData, 'id' | 'type'>;

let id = 0;
const subject = new Subject<ToastData>();

interface HeightT {
  id: number;
  height: number;
  removed: boolean;
}

interface Params {
  gap: number;
}

export const [ToasterProvider, useToaster, ToasterContext] = createContext(
  'ToasterProvider',
  function useToasterContext(params?: Params) {
    const [expanded, setExpanded] = useState(false);
    const [toasts, setToasts] = useState([] as ToastData[]);
    const [heights, setHeights] = useState([] as HeightT[]);

    const frontToastHeight = useMemo(
      () => heights.find((x) => !x.removed)?.height ?? 0,
      [heights],
    );

    const removeToast = useCallback(
      (toast: ToastData) =>
        setToasts((v) => v.filter((x) => x.id !== toast.id)),
      [],
    );

    useEffect(() => subject.subscribe((x) => setToasts((v) => [x, ...v])), []);

    useEffect(() => {
      if (!toasts.length) {
        setExpanded(false);
      }
    }, [toasts.length]);

    return {
      ...params,
      expanded,
      setExpanded,
      toasts,
      removeToast,
      heights,
      setHeights,
      frontToastHeight,
    };
  },
);

const factory =
  (type: ToastType) =>
  (title: ReactNode, options: ToastOptions = {}) => {
    subject.publish({
      id: id++,
      type,
      title,
      ...options,
    });
    return { id };
  };

export const toast = Object.assign(factory('normal'), {
  info: factory('info'),
  success: factory('success'),
  error: factory('error'),
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastOptions = {},
  ) => {
    subject.publish({
      id: id++,
      type: 'promise',
      promise,
      ...options,
    });
    return { id };
  },
});
