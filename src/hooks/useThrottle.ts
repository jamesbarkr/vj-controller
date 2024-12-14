import { useCallback } from "react";

let shouldIgnore = false;

export const useThrottle = (fn: () => void, hold: number) => {
  const throttledFunction = useCallback(() => {
    if (shouldIgnore) {
      return;
    }
    fn();
    shouldIgnore = true;
    setTimeout(() => {
      shouldIgnore = false;
    }, hold);
  }, [hold, fn]);
  return throttledFunction;
};
