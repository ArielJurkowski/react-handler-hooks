import {DependencyList, Key, useRef} from 'react';

interface StoredCallbackData {
  function: () => any;
  params: HandlerParams;
}

export type HandlerParams = Key | { key: Key };

export function useParamsHandler<P extends HandlerParams, T extends unknown[] = [], R = any>(callback: (params: P, ...args: T) => R, deps?: DependencyList): (params: P) => (...args: T) => R {
  const depsRef = useRef<DependencyList | undefined>(deps);
  const depsChanged = !depsRef.current !== !deps ||
    (deps && depsRef.current && deps.length === depsRef.current.length && depsRef.current.find((dep, index) => deps[index] !== dep));
  depsRef.current = deps;
  const newCallbackDataMap = new Map<Key, StoredCallbackData>();
  const storedCallbackDataMap = useRef(newCallbackDataMap);
  if (depsChanged) {
    storedCallbackDataMap.current = newCallbackDataMap;
  }
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  return (params: HandlerParams) => {
    const key: Key = typeof params === 'object' ? params.key! : params;
    let callbackData = storedCallbackDataMap.current.get(key);
    if (callbackData) {
      storedCallbackDataMap.current.get(key)!.params = params;
    } else {
      const newFunction = (...args: T) => {
        const retrievedParams = storedCallbackDataMap.current.get(key)!.params as P;
        callbackRef.current(retrievedParams, ...args);
      };
      callbackData = { function: newFunction, params };
      storedCallbackDataMap.current.set(key, callbackData);
    }
    return callbackData!.function;
  };
}
