export const loadNaverMapsScript = (): Promise<void> => {
  const CLIENT_ID = import.meta.env.VITE_NAVER_MAPS_CLIENT_ID;

  return new Promise((resolve, reject) => {
    if (document.getElementById('naver-map-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-map-script';
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Naver Maps API'));
    document.body.appendChild(script);
  });
};
