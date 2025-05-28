import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BottomNavigation.module.scss';

const cx = classNames.bind(styles);

export const BottomNavigation: React.FC = () => {
  return (
    <footer className={cx('bottom-navigation')}>
      <nav>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/favorites">즐겨찾기</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
