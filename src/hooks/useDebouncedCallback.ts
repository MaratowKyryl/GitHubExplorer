import { useCallback, useEffect, useRef } from "react";

type AnyFn = (...args: any[]) => void;

export function useDebouncedCallback<F extends AnyFn>(fn: F, delayMs: number) {
  const fnRef = useRef(fn);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const debounced = useCallback(
    (...args: Parameters<F>) => {
      cancel();
      timerRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    },
    [delayMs, cancel],
  );

  return debounced;
}
