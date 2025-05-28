import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/components/BottomNavigation/BottomNavigation';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

const cx = classNames.bind(styles);

export const MainLayout: React.FC = () => {
  return (
    <div className={cx('wrapper')}>
      <main className={cx('main')}>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
