import { useState, useEffect } from "react";

/**
 * useDebounce
 * Generic debounce hook that returns a debounced version of the supplied value.
 * @param value The value to debounce
 * @param delay Delay in milliseconds
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
} 