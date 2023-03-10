import { ReactNode, useEffect, useState, useMemo, useCallback } from 'react';

import { createContext } from './hooks';
import { Subject } from './subject';

export type ToastType = 'info' | 'warning' | 'success' | 'error' | 'loading';

export interface ToastData {
  id: number;
  type: ToastType;
  content: ReactNode;
}

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
  function useToasterContext(params: Params) {
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

const factory = (type: ToastType) => (content: ReactNode) =>
  subject.publish({
    id: id++,
    type,
    content,
  });

export const toast = Object.assign(factory('info'), {
  info: factory('info'),
  warning: factory('warning'),
  success: factory('success'),
  error: factory('error'),
  loading: factory('loading'),
});
