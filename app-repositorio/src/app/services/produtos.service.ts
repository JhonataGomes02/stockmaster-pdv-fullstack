import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  // URL do seu Back-end
  private apiUrl = 'http://localhost:3060/produtos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Função auxiliar para criar o Cabeçalho com o Token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Envia o token JWT
    });
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto, { headers: this.getHeaders() });
  }

  update(id: number, produto: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, produto, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}