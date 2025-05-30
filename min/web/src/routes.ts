import { createBrowserRouter } from 'react-router-dom';
import { PAGE_PATHS } from '@/constants/pagePaths';
import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import { Favorites } from '@/pages/Favorites/Favorites';
import { Home } from '@/pages/Home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        path: PAGE_PATHS.HOME,
        Component: Home,
      },
      {
        path: PAGE_PATHS.FAVORITES,
        Component: Favorites,
      },
    ],
  },
]);