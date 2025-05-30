import { CurrentLocationButton } from './CurrentLocationButton';
import { FavoriteToggleButton } from './FavoriteToggleButton';
import { FavoritePlaceToggleButton } from './FavoritePlaceToggleButton';

export const Home: React.FC = () => {
  return (
    <>
      <FavoritePlaceToggleButton />
      <FavoriteToggleButton />
      <CurrentLocationButton />
    </>
  );
};
