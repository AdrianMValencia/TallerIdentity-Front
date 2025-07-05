import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class DefaultListTable {

  // Método abstracto que debe ser implementado por cualquier clase que extienda este servicio
  abstract getAll(
    size: number,        // Número de elementos por página (pageSize)
    sort: string,        // Campo por el cual se quiere ordenar
    order: string,       // Dirección de ordenamiento ('asc' o 'desc')
    page: number,        // Número de la página actual
    getInputs: string,   // Parámetros adicionales que pueden venir como cadena de consulta
  ): Observable<any>;    // El método retorna un Observable (puede ser una respuesta HTTP)
}
