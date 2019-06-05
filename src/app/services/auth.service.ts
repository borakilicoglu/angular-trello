import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import it up here
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:4000/auth/login`, { username, password })
      .pipe(map(user => {
        console.log(user);
        return user;
      }));
  }

}
