import { Key, useLayoutEffect, useRef } from 'react';

export function useParamsHandler<K extends Key, I extends unknown[] = []>(callback:  (key: K, ...args: I) => any): (key: K) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, I extends unknown[] = []>(callback:  (key: K, b: T2, ...args: I) => any): (key: K, b: T2) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, T3, I extends unknown[] = []>(callback:  (key: K, b: T2, c: T3, ...args: I) => any): (key: K, b: T2, c: T3) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, T3, T4, I extends unknown[] = []>(callback:  (key: K, b: T2, c: T3, d: T4, ...args: I) => any): (key: K, b: T2, c: T3, d: T4) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, T3, T4, T5, I extends unknown[] = []>(callback:  (key: K, b: T2, c: T3, d: T4, e: T5, ...args: I) => any): (key: K, b: T2, c: T3, d: T4, e: T5) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, T3, T4, T5, T6, I extends unknown[] = []>(callback:  (key: K, b: T2, c: T3, d: T4, e: T5, f: T6, ...args: I) => any): (key: K, b: T2, c: T3, d: T4, e: T5, f: T6) => (...args: I) => any;
export function useParamsHandler<K extends Key, T2, T3, T4, T5, T6, T7, I extends unknown[] = []>(callback:  (key: K, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, ...args: I) => any): (key: K, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7) => (...args: I) => any;
export function useParamsHandler(callback:  (...args: any[]) => any) {
  const passedCallbackMap = useRef(new Map<Key, (() => any)>());
  const passedCallbackParamsMap = useRef(new Map<Key, any[]>());
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return (...outerArgs: any[]) => {
    const key: Key = outerArgs[0]!;
    let functionToPass = passedCallbackMap.current.get(key);
    passedCallbackParamsMap.current.set(key, outerArgs);
    if (!functionToPass) {
      const newFunctionToPass = (...innerArgs: any[]) => {
        const outerArgs = passedCallbackParamsMap.current.get(key)!;
        callbackRef.current(...outerArgs, ...innerArgs)
      };
      passedCallbackMap.current.set(key, newFunctionToPass);
      functionToPass = newFunctionToPass;
    }
    return functionToPass;
  };
}
