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
  {
    path: 'roles',
    loadComponent: () =>
      import('./pages/roles/components/role-list/role-list').then(
        (c) => c.RoleList
      ),
  },
  {
    path: 'roles/crear',
    loadComponent: () =>
      import('./pages/roles/components/role-management/role-management').then(
        (c) => c.RoleManagement
      ),
  },
  {
    path: 'roles/editar/:roleId',
    loadComponent: () =>
      import('./pages/roles/components/role-management/role-management').then(
        (c) => c.RoleManagement
      ),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    children: childrenRoutes,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/components/login/login').then((c) => c.Login),
  },
];
