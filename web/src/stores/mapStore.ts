import { create } from 'zustand';

import type { MarkerInfo } from '@/types/naverMap';

interface MapState {
  currentMarker: MarkerInfo | null;
  isMapInitialized: boolean;
  setCurrentMarker: (marker: MarkerInfo | null) => void;
  setMapInitialized: (initialized: boolean) => void;
}

export const useMapStore = create<MapState>()((set) => ({
  currentMarker: null,
  isMapInitialized: false,
  setCurrentMarker: (marker) => set(() => ({ currentMarker: marker })),
  setMapInitialized: (initialized) =>
    set(() => ({ isMapInitialized: initialized })),
}));
