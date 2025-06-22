export interface NaverMapCenter {
  lat: number;
  lng: number;
}

export interface NaverMapOptions extends Omit<naver.maps.MapOptions, 'center'> {
  center?: NaverMapCenter;
}

export type MapRef = React.RefObject<naver.maps.Map | null>;

export interface MarkerInfo {
  coord: {
    lat: number;
    lng: number;
  };
  address?: string;
  id: string;
}

export interface MapOutletContextType {
  mapRef: MapRef;
}
