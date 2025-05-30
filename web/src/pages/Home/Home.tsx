import { useToggle } from '@/hooks/useToggle';
import RoundStar from '@/assets/icons/RoundStar.svg?react';
import { CurrentLocationButton } from './CurrentLocationButton';
import { FavoriteToggleButton } from './FavoriteToggleButton';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

export const Home: React.FC = () => {
  const [showFavoritePlace, toggleShowFavoritePlace] = useToggle(false);

  return (
    <>
      <span
        role="checkbox"
        className={cx('toggle-favorite-place')}
        tabIndex={0}
        onClick={toggleShowFavoritePlace}
        aria-checked={showFavoritePlace}
      >
        <RoundStar aria-hidden="true" />
        즐겨찾기
      </span>
      <FavoriteToggleButton />
      <CurrentLocationButton />
    </>
  );
};
