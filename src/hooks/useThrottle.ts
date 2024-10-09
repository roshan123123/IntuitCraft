import { useRef, useCallback } from 'react';

const useThrottle = (fn: Function, delay = 500, cardKey?: number) => {
  let timer = useRef<any>(null);

  const returnFunction = useCallback(
    function (...args: any) {
      if (!timer.current) {
        fn(...args);
        timer.current = setTimeout(() => {
          timer.current = null;
        }, delay);
      }
    },
    [fn, delay, cardKey],
  );
  return returnFunction;
};

export default useThrottle;
