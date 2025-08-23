export interface CreateRoleRequest {
  name: string;
  description?: string;
  state?: string;
  permissions: PermissionRequest[];
  menus: MenuRequest[];
}

export interface PermissionRequest {
  permissionId: number;
  permissionName: string;
  permissionDescription: string;
  selected: boolean;
}

export interface MenuRequest {
  menuId: number;
}

export interface UpdateRoleRequest {
  roleId: number;
  name: string;
  description?: string;
  state?: string;
  permissions: PermissionUpdateRequest[];
  menus: MenuUpdateRequest[];
}

export interface PermissionUpdateRequest {
  permissionId: number;
  permissionName: string;
  permissionDescription: string;
  selected: boolean;
}

export interface MenuUpdateRequest {
  menuId: number;
}
