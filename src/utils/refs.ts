import { RefObject, createRef } from "react";

export function createRefsArray<T>(length: number): Array<RefObject<T>> {
  const refs: RefObject<T>[] = [];
  for (let i = 0; i < length; i++) {
    refs.push(createRef<T>());
  }
  return refs;
}
