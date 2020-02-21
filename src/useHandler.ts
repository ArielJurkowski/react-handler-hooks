import {useCallback, useLayoutEffect, useRef} from "react";

export function useHandler(callback: () => any): () => any;
export function useHandler<T1>(callback: (...args: [T1]) => any): (...args: [T1]) => any;
export function useHandler<T1, T2>(callback: (...args: [T1, T2]) => any): (...args: [T1, T2]) => any;
export function useHandler<T1, T2, T3>(callback: (...args: [T1, T2, T3]) => any): (...args: [T1, T2, T3]) => any;
export function useHandler<T1, T2, T3, T4>(callback: (...args: [T1, T2, T3, T4]) => any): (...args: [T1, T2, T3, T4]) => any;
export function useHandler<T1, T2, T3, T4, T5>(callback: (...args: [T1, T2, T3, T4, T5]) => any): (...args: [T1, T2, T3, T4, T5]) => any;
export function useHandler<T1, T2, T3, T4, T5, T6>(callback: (...args: [T1, T2, T3, T4, T5, T6]) => any): (...args: [T1, T2, T3, T4, T5, T6]) => any;
export function useHandler<T1, T2, T3, T4, T5, T6, T7>(callback: (...args: [T1, T2, T3, T4, T5, T6, T7]) => any): (...args: [T1, T2, T3, T4, T5, T6, T7]) => any;
export function useHandler(callback: (...args: any[]) => any) {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return useCallback(
    (...args: any[]) => callbackRef.current(...args),
    []
  );
}
