import { ReactNode } from "react";

import { Subject } from "./subject";

export type ToastType =
  | "normal"
  | "info"
  | "success"
  | "error"
  | "promise"
  | "update";

export interface ToastData {
  id: number;
  type: ToastType;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  duration?: number;
  promise?: Promise<any> | (() => Promise<any>);
  removed?: boolean;
}

export type ToastOptions = Omit<ToastData, "id" | "type">;

let id = 0;
export const subject = new Subject<ToastData>();

export const update = (id: number, options: ToastOptions) =>
  subject.publish({
    id,
    type: "update",
    ...options,
  });

export const dismiss = (id: number) =>
  subject.publish({
    id,
    type: "update",
    removed: true,
  });

const publish = (data: Omit<ToastData, "id">) => {
  const mId = id++;

  subject.publish({
    id: mId,
    ...data,
  });

  return {
    id: mId,
    dismiss: () => dismiss(mId),
    update: (options: ToastOptions) => update(mId, options),
  };
};

const factory =
  (type: ToastType) =>
  (title: ReactNode, options: ToastOptions = {}) =>
    publish({ type, title, ...options });

export const toast = Object.assign(factory("normal"), {
  info: factory("info"),
  success: factory("success"),
  error: factory("error"),
  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    options: ToastOptions = {}
  ) => publish({ type: "promise", promise, ...options }),
});
