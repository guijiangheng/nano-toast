import { ReactNode, useEffect, useState } from 'react';

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
}

interface Params {
  gap: number;
}

export const [ToasterProvider, useToaster, ToasterContext] = createContext(
  'ToasterProvider',
  function useToasterContext(params: Params) {
    const [toasts, setToasts] = useState([] as ToastData[]);
    const [heights, setHeights] = useState([] as HeightT[]);

    const removeToast = (toast: ToastData) =>
      setToasts((v) => v.filter((x) => x.id !== toast.id));

    useEffect(() => subject.subscribe((x) => setToasts((v) => [x, ...v])), []);

    return {
      ...params,
      toasts,
      removeToast,
      heights,
      setHeights,
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
