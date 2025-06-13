import { http, HttpResponse } from 'msw';
import { favorites } from './data';

export const handlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json(favorites);
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
