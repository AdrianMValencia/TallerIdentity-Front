import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '@env/environment.development';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { Alert } from '@shared/services/alert';
import { endpoint } from '@shared/utils/endpoints.util';
import { getIcon, getStateBadge } from '@shared/utils/functions.util';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../models/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly alertService = inject(Alert);

  /**
   * Obtiene una lista de usuarios paginados y ordenados desde el backend
   */
  getAll(
    size: number, // Cantidad de registros por página
    sort: string, // Campo por el cual ordenar
    order: string, // Dirección del orden ('asc' o 'desc')
    numPage: number, // Página actual (índice desde 0)
    getInputs: string // Parámetros adicionales en formato de query string (por ejemplo: &name=juan)
  ): Observable<BaseApiResponse<UserResponse[]>> {
    // Construye la URL del request, sumando 1 a la página porque en backend suele empezar desde 1
    const requestUrl = `${env.api}${
      endpoint.LIST_USERS
    }?records=${size}&sort=${sort}&order=${order}&numPage=${
      numPage + 1
    }${getInputs}`;

    // Realiza una petición GET y transforma la respuesta
    return this.httpClient
      .get<BaseApiResponse<UserResponse[]>>(requestUrl)
      .pipe(
        map((resp) => {
          // Itera sobre cada usuario y agrega propiedades calculadas para mostrar en la vista
          resp.data.forEach(function (user: UserResponse) {
            user.fullName = user.firstName + ' ' + user.lastName; // Combina nombre y apellido
            user.stateDescription = getStateBadge(
              user.stateDescription,
              'Estado del usuario'
            ); // Transforma el estado en un badge visual
            user.icEdit = getIcon('edit', 'Actualizar usuario'); // Ícono de editar
            user.icDelete = getIcon('delete', 'Eliminar usuario'); // Ícono de eliminar
          });
          return resp; // Devuelve la respuesta modificada
        })
      );
  }
}
