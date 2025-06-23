import { useMemo } from "react";

export interface PlatformInfo {
  isMac: boolean;
  isWindows: boolean;
  isLinux: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  shortcutKey: string; // Cmd+K или Ctrl+K
}

export function usePlatform(): PlatformInfo {
  return useMemo(() => {
    if (typeof navigator === 'undefined') {
      // Server-side rendering или тестирование
      return {
        isMac: false,
        isWindows: false,
        isLinux: false,
        isIOS: false,
        isAndroid: false,
        shortcutKey: 'Ctrl+K'
      };
    }

    const platform = navigator.platform.toUpperCase();
    const userAgent = navigator.userAgent.toUpperCase();

    const isMac = platform.indexOf('MAC') >= 0;
    const isWindows = platform.indexOf('WIN') >= 0;
    const isLinux = platform.indexOf('LINUX') >= 0;
    const isIOS = /IPAD|IPHONE|IPOD/.test(platform) || 
                  (platform === 'MACINTEL' && navigator.maxTouchPoints > 1);
    const isAndroid = userAgent.indexOf('ANDROID') >= 0;

    return {
      isMac,
      isWindows,
      isLinux,
      isIOS,
      isAndroid,
      shortcutKey: isMac ? 'Cmd+K' : 'Ctrl+K'
    };
  }, []);
} 