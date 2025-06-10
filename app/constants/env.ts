export const getWebUrl = () => {
  if (__DEV__) {
    return process.env.EXPO_PUBLIC_WEB_URL || 'http://localhost:5173';
  } else {
    return process.env.EXPO_PUBLIC_WEB_URL || 'https://simple-webview-map-uh2i.vercel.app';
  }
};
