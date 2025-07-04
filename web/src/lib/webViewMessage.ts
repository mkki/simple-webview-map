import { MESSAGE_TYPES } from '@/constants/webViewMessageType';

import type { MapRef } from '@/types/naverMap';

export const handleWebViewMessage = (event: MessageEvent, mapRef: MapRef) => {
  try {
    const { type, payload } = JSON.parse(event.data);
    console.log('Received message in web:', { type, payload });

    switch (type) {
      case MESSAGE_TYPES.CURRENT_LOCATION:
        if (
          typeof window.naver !== 'undefined' &&
          mapRef.current instanceof naver.maps.Map
        ) {
          const latLng = new naver.maps.LatLng(payload.lat, payload.lng);
          mapRef.current.setCenter(latLng);
          mapRef.current.setZoom(16);

          new naver.maps.Marker({
            position: new naver.maps.LatLng(
              payload.lat,
              payload.lng
            ),
            map: mapRef.current,
            icon: {
              url: '/icons/CurrentLocation.svg',
              size: new naver.maps.Size(32, 32),
              anchor: new naver.maps.Point(16, 32),
              scaledSize: new naver.maps.Size(32, 32),
            },
          });

          console.log('Map center updated to:', payload.lat, payload.lng);
        }
        break;

      default:
        console.error('Unknown message type:', type);
    }
  } catch (e) {
    console.error('Wrong message:', e);
  }
};
