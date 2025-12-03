import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3060/auth'; 
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private router: Router) { }

  //MÉTODOS DE API

  registrar(credentials: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/registrar`, credentials); 
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // --- MÉTODOS DE TOKEN  ---

  // 1. Salva o token no navegador 
  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // 2. Pega o token para usar nas requisições
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // 3. Verifica se tem token salvo (útil para o Guard)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // 4. Logout
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}