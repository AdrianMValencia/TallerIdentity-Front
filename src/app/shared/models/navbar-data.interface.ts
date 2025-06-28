export interface INavbarData {
  menuId?: number;
  route: string;
  icon: string;
  label: string;
  expanded?: boolean;
  items?: INavbarData[];
}

export const navbarData: INavbarData[] = [
  {
    route: 'users',
    icon: 'group',
    label: 'Usuarios',
  },
  {
    route: 'roles',
    icon: 'add_moderator',
    label: 'Roles',
  },
  {
    route: 'user-roles',
    icon: 'manage_accounts',
    label: 'Rol de usuarios',
  }
];
