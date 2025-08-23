export interface RoleResponse {
  roleId: number;
  name: string;
  description?: string;
  state?: string;
  stateDescription?: any;
  icEdit: string;
  icDelete: string;
}

export interface RoleByIdResponse {
  roleId: number;
  name: string;
  description?: string;
  state?: string;
}

export interface PermissionsByRoleResponse {
  menuId: number;
  fatherId?: number | null;
  menu: string;
  icon: string;
  permissions: PermissionsResponse[];
}

export interface PermissionsResponse {
  permissionId: number;
  permissionName: string;
  permissionDescription: string;
  selected: boolean;
}
