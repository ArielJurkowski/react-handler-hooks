import {useCallback, useLayoutEffect, useRef} from "react";

export function useParamsHandler<I extends unknown[] = []>(callback:  (...args: I) => any): () => (...args: I) => any;
export function useParamsHandler<T, I extends unknown[] = []>(callback:  (a: T, ...args: I) => any): (a: T) => (...args: I) => any;
export function useParamsHandler<T1, T2, I extends unknown[] = []>(callback:  (a: T1, b: T2, ...args: I) => any): (a: T1, b: T2) => (...args: I) => any;
export function useParamsHandler<T1, T2, T3, I extends unknown[] = []>(callback:  (a: T1, b: T2, c: T3, ...args: I) => any): (a: T1, b: T2, c: T3) => (...args: I) => any;
export function useParamsHandler<T1, T2, T3, T4, I extends unknown[] = []>(callback:  (a: T1, b: T2, c: T3, d: T4, ...args: I) => any): (a: T1, b: T2, c: T3, d: T4) => (...args: I) => any;
export function useParamsHandler<T1, T2, T3, T4, T5, I extends unknown[] = []>(callback:  (a: T1, b: T2, c: T3, d: T4, e: T5, ...args: I) => any): (a: T1, b: T2, c: T3, d: T4, e: T5) => (...args: I) => any;
export function useParamsHandler<T1, T2, T3, T4, T5, T6, I extends unknown[] = []>(callback:  (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, ...args: I) => any): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => (...args: I) => any;
export function useParamsHandler<T1, T2, T3, T4, T5, T6, T7, I extends unknown[] = []>(callback:  (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7) => any): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7) => (...args: I) => any;
export function useParamsHandler(callback:  (...args: any[]) => any) {
  const outerArgsRef = useRef<any[]>();
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  const passedRef = useCallback(
    (...innerArgs: any[]) => callbackRef.current(...outerArgsRef.current!, ...innerArgs),
    []
  );
  return (...outerArgs: any[]) => {
    outerArgsRef.current = outerArgs;
    return passedRef;
  };
}
