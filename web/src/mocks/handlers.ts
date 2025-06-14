import { http, HttpResponse } from 'msw';
import { favorites } from './data';
import type { MarkerInfo } from '@/types/naverMap';

export const handlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json(favorites);
  }),
  http.post('/api/favorites', async ({ request }): Promise<Response> => {
    try {
      const newFavorite = (await request.json()) as MarkerInfo;

      if (!newFavorite.coord || !newFavorite.address) {
        return HttpResponse.json(
          { error: 'Missing required fields: coord and address' },
          { status: 400 }
        );
      }

      const isDuplicate = favorites.some(
        (favorite) =>
          favorite.coord.lat === newFavorite.coord.lat &&
          favorite.coord.lng === newFavorite.coord.lng
      );

      if (isDuplicate) {
        return HttpResponse.json(
          { error: 'A favorite with the same coordinates already exists' },
          { status: 409 }
        );
      }

      favorites.push(newFavorite);

      return HttpResponse.json(newFavorite, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Invalid JSON payload' + error },
        { status: 400 }
      );
    }
  }),
  http.delete('/api/favorites/:id', ({ params }) => {
    const { id } = params;

    const favoriteToDelete = favorites.find((favorite) => favorite.id === id);

    if (!favoriteToDelete) {
      return HttpResponse.json(
        { error: 'Favorite not found' },
        { status: 404 }
      );
    }

    const filteredFavorites = favorites.filter(
      (favorite) => favorite.id !== id
    );

    favorites.splice(0, favorites.length, ...filteredFavorites);

    return HttpResponse.json({
      message: 'Favorite deleted successfully',
      deleted: favoriteToDelete,
      remaining: favorites,
    });
  }),
];
