import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { api } from '@/api/client';
import type { MarkerInfo } from '@/types/naverMap';

function App() {
  const setFavoritePlaces = useFavoriteStore((state) => state.setFavoritePlaces);

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      try {
        const data = await api.get<MarkerInfo[]>('/favorites');
        setFavoritePlaces(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavoritePlaces();
  }, [setFavoritePlaces]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
