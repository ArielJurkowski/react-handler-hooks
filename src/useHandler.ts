import {DependencyList, useCallback, useRef} from 'react';

export function useHandler<T extends (...args: any[]) => any>(callback: T, deps: DependencyList = []): T {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return useCallback(
    (...args: any[]) => callbackRef.current(...args),
    deps
  ) as T;
}
