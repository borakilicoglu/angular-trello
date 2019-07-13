import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Credentials, CredentialsService } from './credentials.service';
import { environment } from '@env/environment';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

export interface RegisterContext {
  username: string;
  email: string;
  password: string;
  remember?: boolean;
}

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.http.post<any>(`${environment.serverUrl}/auth/login`, { ...context }).pipe(
      map(data => {
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  /**
   * Register the user.
   * @param context The registewr parameters.
   * @return The user credentials.
   */
  register(context: RegisterContext): Observable<Credentials> {
    return this.http.post<any>(`${environment.serverUrl}/auth/register`, { ...context }).pipe(
      map(data => {
        this.credentialsService.setCredentials(data, context.remember);
        return data;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  getAuthorizationToken(): any {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    return credentials && credentials.token;
  }
}
