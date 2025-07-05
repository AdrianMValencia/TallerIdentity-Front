import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout/layout';

const childrenRoutes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/components/user-list/user-list').then(
        (c) => c.UserList
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: childrenRoutes,
  },
];
