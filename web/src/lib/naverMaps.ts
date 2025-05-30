export const loadNaverMapsScript = (): Promise<void> => {
  const CLIENT_ID = import.meta.env.VITE_NAVER_MAPS_CLIENT_ID;

  return new Promise((resolve, reject) => {
    if (document.getElementById('naver-map-script')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'naver-map-script';
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}&submodules=geocoder`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Naver Maps API'));
    document.body.appendChild(script);
  });
};

export const searchCoordinateToAddress = (
  lat: number,
  lng: number
): Promise<naver.maps.Service.ReverseGeocodeResponse> => {
  return new Promise((resolve, reject) => {
    const coord = new naver.maps.LatLng(lat, lng);

    naver.maps.Service.reverseGeocode(
      {
        coords: coord,
        orders: [
          naver.maps.Service.OrderType.ROAD_ADDR,
          naver.maps.Service.OrderType.ADDR,
        ].join(','),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK || !response) {
          console.error('[ReverseGeocode Error]', { status, response });
          reject(new Error('Reverse geocoding failed'));
        } else {
          resolve(response);
        }
      }
    );
  });
};
