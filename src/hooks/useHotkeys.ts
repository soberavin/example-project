import { useEffect } from "react";

interface HotkeyConfig {
  key: string;
  ctrl?: boolean;
  callback: () => void;
  preventDefault?: boolean;
}

export function useHotkeys(hotkeys: HotkeyConfig[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      hotkeys.forEach((hotkey) => {
        const { key, ctrl = false, callback, preventDefault = true } = hotkey;

        const isKeyMatch = e.key.toLowerCase() === key.toLowerCase();
        // Для кроссплатформенности: ctrl работает как ctrl на Windows/Linux и как cmd на Mac
        const isModifierMatch = ctrl ? (e.ctrlKey || e.metaKey) : true;

        if (isKeyMatch && isModifierMatch) {
          if (preventDefault) {
            e.preventDefault();
          }
          callback();
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeys]);
}

// Упрощенная версия для одной горячей клавиши
export function useHotkey(
  key: string,
  callback: () => void,
  options: Omit<HotkeyConfig, 'key' | 'callback'> = {}
) {
  useHotkeys([{ key, callback, ...options }]);
} 