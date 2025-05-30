import { useRef, useCallback } from 'react';
import { WebView } from 'react-native-webview';

export interface WebMessage<T = unknown> {
  type: string;
  payload: T;
}

export function useWebViewMessenger() {
  const webviewRef = useRef<WebView>(null);

  const postMessage = useCallback(<T>(message: WebMessage<T>) => {
    if (!webviewRef.current) return;
    webviewRef.current.postMessage(JSON.stringify(message));
  }, []);

  return [webviewRef, postMessage];
}
