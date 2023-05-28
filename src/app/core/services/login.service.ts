import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginClient } from '../clients/login.client';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenKey = 'token';
  private roleKey = 'role';

  constructor(
    private loginClient: LoginClient,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    this.loginClient.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token);
      // localStorage.setItem(this.role, token);
      this.router.navigate(['/']);
    });
    // this.loginClient.getCurrentUser().subscribe();
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}