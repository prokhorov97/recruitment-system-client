import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/api/login',
      {
        email: username,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  getCurrentUser() {
    return this.http.post(environment.apiUrl  + '/api/users/current', {});
  }
}
