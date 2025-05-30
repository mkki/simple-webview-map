import { useMemo } from 'react';

export const useIsWebView = () =>
  useMemo(() => typeof window?.ReactNativeWebView !== 'undefined', []);
