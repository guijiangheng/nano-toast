export interface Subscriber<T> {
  (data: T): void;
}

export class Subject<T> {
  constructor(private subscribers: Array<Subscriber<T>> = []) {}

  subscribe(subscriber: Subscriber<T>) {
    this.subscribers.push(subscriber);

    return () => {
      const k = this.subscribers.findIndex((x) => x === subscriber);
      this.subscribers.splice(k, 1);
    };
  }

  publish(data: T) {
    this.subscribers.forEach((x) => x(data));
  }
}
