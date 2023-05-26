import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationClient } from '../clients/registration.client';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private tokenKey = 'token';

  constructor(
    private registrationClient: RegistrationClient,
    private router: Router
  ) {}

  public register(username: string, email: string, password: string): void {
    this.registrationClient
      .register(username, email, password)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/']);
      });
  }
}