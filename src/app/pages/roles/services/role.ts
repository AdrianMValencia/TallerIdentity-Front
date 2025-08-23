import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment as env } from '@env/environment.development';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { Alert } from '@shared/services/alert';
import { endpoint } from '@shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';
import { map, Observable } from 'rxjs';
import {
  CreateRoleRequest,
  UpdateRoleRequest,
} from '../models/role-request.interface';
import {
  PermissionsByRoleResponse,
  RoleByIdResponse,
  RoleResponse,
} from '../models/role-response.interface';

@Injectable({
  providedIn: 'root',
})
export class Role {
  private readonly httpClient = inject(HttpClient);
  private readonly alert = inject(Alert);

  getAll(
    size: number,
    sort: string,
    order: string,
    numPage: number,
    getInputs: string
  ): Observable<BaseApiResponse<RoleResponse[]>> {
    const requestUrl = `${env.api}${
      endpoint.ROLE
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    return this.httpClient
      .get<BaseApiResponse<RoleResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          resp.data.forEach(function (role: RoleResponse) {
            role.stateDescription = getStateBadge(
              role.stateDescription,
              'Estado del rol'
            );
            role.icEdit = getIcon('edit', 'Actualizar rol');
            role.icDelete = getIcon('delete', 'Eliminar rol');
          });
          return resp;
        })
      );
  }

  roleById = signal<RoleByIdResponse | null>(null);

  fetchRoleById(roleId: number): void {
    const requestUrl = `${env.api}${endpoint.ROLE}/${roleId}`;
    this.httpClient
      .get<BaseApiResponse<RoleByIdResponse>>(requestUrl)
      .pipe(map((resp) => resp.data))
      .subscribe((data) => {
        this.roleById.set(data);
      });
  }

  roleCreate(role: CreateRoleRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.ROLE}`;
    return this.httpClient.post<BaseApiResponse<boolean>>(requestUrl, role);
  }

  roleUpdate(role: UpdateRoleRequest): Observable<BaseApiResponse<boolean>> {
    const requestUrl = `${env.api}${endpoint.ROLE}`;
    return this.httpClient.put<BaseApiResponse<boolean>>(requestUrl, role);
  }

  roleDelete(roleId: number): Observable<void> {
    const requestUrl = `${env.api}${endpoint.ROLE}/${roleId}`;
    return this.httpClient.delete<BaseApiResponse<boolean>>(requestUrl).pipe(
      map((resp: BaseApiResponse<boolean>) => {
        if (resp.isSuccess) {
          this.alert.success('Excelente', resp.message);
        }
      })
    );
  }

  permissionByRoleId(roleId: number): Observable<PermissionsByRoleResponse[]> {
    const requestUrl = `${env.api}${endpoint.PERMISSION_BY_ROLE_ID}${roleId}`;
    return this.httpClient
      .get<BaseApiResponse<PermissionsByRoleResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          return resp.data;
        })
      );
  }
}
