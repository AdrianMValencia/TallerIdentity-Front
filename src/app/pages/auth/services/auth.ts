import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '@env/environment.development';
import { BaseApiResponse } from '@shared/models/commons/base-api-response.interface';
import { endpoint } from '@shared/utils/endpoints.util';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private user: BehaviorSubject<string>;

  public get userToken(): string {
    return this.user.value;
  }

  constructor() {
    this.user = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token')!)
    );
  }

  login(request: LoginRequest): Observable<BaseApiResponse<string>> {
    const requestUrl = `${env.api}${endpoint.LOGIN}`;

    return this.http.post<BaseApiResponse<string>>(requestUrl, request).pipe(
      map((response: BaseApiResponse<string>) => {
        if (response.isSuccess) {
          localStorage.setItem('token', JSON.stringify(response.data));
          this.user.next(response.data);
        }

        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user.next('');
    this.router.navigate(['/login']);
  }
}
