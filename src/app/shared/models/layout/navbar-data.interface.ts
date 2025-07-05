export interface INavbarData {
  menuId?: number;
  path: string;
  icon: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}

export const navbarData: INavbarData[] = [
  {
    path: 'users',
    icon: 'group',
    label: 'Usuarios',
  },
  {
    path: 'roles',
    icon: 'add_moderator',
    label: 'Roles',
  },
  {
    path: 'user-roles',
    icon: 'manage_accounts',
    label: 'Rol de usuarios',
  }
];
