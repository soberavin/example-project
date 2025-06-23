import { useHotkey } from "./useHotkeys";

export function useEscapeKey(callback: () => void) {
  useHotkey("Escape", callback, { preventDefault: false });
} 