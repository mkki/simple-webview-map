import { create } from 'zustand';
import type { MarkerInfo } from '@/types/naverMap';

interface FavoriteState {
  favoritePlaces: MarkerInfo[];
  showFavoritePlaces: boolean;
  setFavoritePlaces: (places: MarkerInfo[]) => void;
  addFavoritePlace: (place: MarkerInfo) => void;
  removeFavoritePlace: (id: string) => void;
  toggleShowFavoritePlaces: () => void;
  setShowFavoritePlaces: (show: boolean) => void;
}

export const useFavoriteStore = create<FavoriteState>()((set) => ({
  favoritePlaces: [],
  showFavoritePlaces: false,

  setFavoritePlaces: (places) => set(() => ({ favoritePlaces: places })),

  addFavoritePlace: (place) =>
    set((state) => ({
      favoritePlaces: [...state.favoritePlaces, place],
    })),

  removeFavoritePlace: (address) =>
    set((state) => ({
      favoritePlaces: state.favoritePlaces.filter(
        (place) => place.address !== address
      ),
    })),

  toggleShowFavoritePlaces: () =>
    set((state) => ({
      showFavoritePlaces: !state.showFavoritePlaces,
    })),

  setShowFavoritePlaces: (show) => set(() => ({ showFavoritePlaces: show })),
}));
