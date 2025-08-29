import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DownloadXslx {
  private readonly http = inject(HttpClient);

  // Método executeDownload() que realiza una solicitud
  // de descarga y devuelve un Observable de Blob
  executeDownload(url: string): Observable<Blob> {
    // Realizamos una solicitud GET utilizando HttpClient
    // con la URL proporcionada y configurando el tipo de respuesta como Blob
    return this.http.get<Blob>(`${env.api}${url}`, {
      responseType: 'blob' as 'json',
    });
  }
}
