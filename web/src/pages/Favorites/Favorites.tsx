import { BottomSheet } from './BottomSheet';
import { FavoritePlaceList } from './FavoritePlaceList';

export const Favorites: React.FC = () => {
  return (
    <>
      <BottomSheet>
        <FavoritePlaceList />
      </BottomSheet>
    </>
  );
};
