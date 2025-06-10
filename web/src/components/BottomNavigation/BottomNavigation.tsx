import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';

import Home from '@/assets/icons/Home.svg?react';
import Star from '@/assets/icons/Star.svg?react';

import classNames from 'classnames/bind';
import styles from './BottomNavigation.module.scss';

const cx = classNames.bind(styles);

type TabItem = {
  id: string;
  label: string;
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const tabs: TabItem[] = [
  {
    id: uuidv4(),
    label: '홈',
    path: PAGE_PATHS.HOME,
    icon: Home,
  },
  {
    id: uuidv4(),
    label: '즐겨찾기',
    path: PAGE_PATHS.FAVORITES,
    icon: Star,
  },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <footer className={cx('bottom-navigation')}>
      <nav>
        <ul className={cx('tab-list')}>
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={cx('tab-item', {
              })}
              aria-current={location.pathname === tab.path ? 'page' : undefined}
            >
              <Link to={tab.path} className={cx('tab-link')}>
                <tab.icon aria-hidden="true" />
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
